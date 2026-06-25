import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@sanity/ui";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@sanity/icons";
import { useClient, type Tool } from "sanity";

const TIME_ZONE = "Europe/Paris";
const START_HOUR = 9;
const END_HOUR = 19;
const SLOT_MINUTES = 30;
const DAYS_VISIBLE = 7;
const API_VERSION = "2026-06-24";

type SlotInfo = { id: string; booked: boolean };

function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts: Record<string, string> = {};
  for (const part of new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date)) {
    if (part.type !== "literal") parts[part.type] = part.value;
  }
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return asUTC - date.getTime();
}

function zonedTimeToUtc(year: number, month: number, day: number, hour: number, minute: number): Date {
  const utcGuess = new Date(Date.UTC(year, month, day, hour, minute));
  const offset = getTimeZoneOffsetMs(utcGuess, TIME_ZONE);
  return new Date(utcGuess.getTime() - offset);
}

function getParisDateParts(date: Date): { year: number; month: number; day: number } {
  const formatted = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  const [year, month, day] = formatted.split("-").map(Number);
  return { year, month, day };
}

function addDays(parts: { year: number; month: number; day: number }, days: number) {
  const anchor = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12));
  anchor.setUTCDate(anchor.getUTCDate() + days);
  return { year: anchor.getUTCFullYear(), month: anchor.getUTCMonth() + 1, day: anchor.getUTCDate() };
}

function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function AvailabilityCalendar() {
  const client = useClient({ apiVersion: API_VERSION });
  const toast = useToast();

  const [weekOffset, setWeekOffset] = useState(0);
  const [slotsByIso, setSlotsByIso] = useState<Map<string, SlotInfo>>(new Map());
  const [pendingAdds, setPendingAdds] = useState<Set<string>>(new Set());
  const [pendingRemoves, setPendingRemoves] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const days = useMemo(() => {
    const today = getParisDateParts(new Date());
    const weekStart = addDays(today, weekOffset * DAYS_VISIBLE);
    return Array.from({ length: DAYS_VISIBLE }, (_, i) => addDays(weekStart, i));
  }, [weekOffset]);

  const rangeStart = useMemo(
    () => zonedTimeToUtc(days[0].year, days[0].month, days[0].day, 0, 0).toISOString(),
    [days],
  );
  const rangeEnd = useMemo(
    () => zonedTimeToUtc(days[DAYS_VISIBLE - 1].year, days[DAYS_VISIBLE - 1].month, days[DAYS_VISIBLE - 1].day, 23, 59).toISOString(),
    [days],
  );

  const loadSlots = useCallback(async () => {
    setLoading(true);
    try {
      const result = await client.fetch<{ id: string; start: string; booked: boolean }[]>(
        `*[_type == "appointmentSlot" && start >= $from && start <= $to]{ "id": _id, start, "booked": defined(booking.email) }`,
        { from: rangeStart, to: rangeEnd },
      );
      const map = new Map<string, SlotInfo>();
      for (const slot of result) {
        map.set(new Date(slot.start).toISOString(), { id: slot.id, booked: slot.booked });
      }
      setSlotsByIso(map);
      setPendingAdds(new Set());
      setPendingRemoves(new Set());
    } catch {
      toast.push({ status: "error", title: "Impossible de charger les créneaux." });
    } finally {
      setLoading(false);
    }
  }, [client, rangeStart, rangeEnd, toast]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const hours = useMemo(() => {
    const result: { hour: number; minute: number }[] = [];
    for (let h = START_HOUR; h < END_HOUR; h++) {
      for (let m = 0; m < 60; m += SLOT_MINUTES) {
        result.push({ hour: h, minute: m });
      }
    }
    return result;
  }, []);

  const dayLabelFormatter = useMemo(
    () => new Intl.DateTimeFormat("fr-FR", { timeZone: TIME_ZONE, weekday: "short", day: "numeric", month: "short" }),
    [],
  );

  function handleCellClick(iso: string, existing: SlotInfo | undefined) {
    if (existing?.booked) return;
    if (existing) {
      setPendingRemoves((prev) => toggleInSet(prev, existing.id));
    } else {
      setPendingAdds((prev) => toggleInSet(prev, iso));
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      let tx = client.transaction();
      for (const iso of pendingAdds) {
        tx = tx.create({ _type: "appointmentSlot", start: iso, durationMinutes: SLOT_MINUTES });
      }
      for (const id of pendingRemoves) {
        tx = tx.delete(id);
      }
      await tx.commit();
      toast.push({ status: "success", title: "Disponibilités mises à jour." });
      await loadSlots();
    } catch {
      toast.push({ status: "error", title: "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  }

  const hasPending = pendingAdds.size > 0 || pendingRemoves.size > 0;
  const now = Date.now();

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Flex align="center" justify="space-between">
          <Heading size={2}>Disponibilités</Heading>
          <Flex align="center" gap={2}>
            <Button
              icon={ChevronLeftIcon}
              mode="ghost"
              onClick={() => setWeekOffset((w) => w - 1)}
              aria-label="Semaine précédente"
            />
            <Button text="Aujourd'hui" mode="ghost" onClick={() => setWeekOffset(0)} />
            <Button
              icon={ChevronRightIcon}
              mode="ghost"
              onClick={() => setWeekOffset((w) => w + 1)}
              aria-label="Semaine suivante"
            />
          </Flex>
        </Flex>

        <Text size={1} muted>
          Cliquez sur une case pour proposer ce créneau, cliquez à nouveau pour le retirer. Les créneaux déjà réservés (en rouge) ne peuvent pas être modifiés ici.
        </Text>

        {loading ? (
          <Flex justify="center" padding={4}>
            <Spinner muted />
          </Flex>
        ) : (
          <Card border radius={2} overflow="auto">
            <Grid columns={DAYS_VISIBLE + 1} style={{ minWidth: 760 }}>
              <Box padding={2} />
              {days.map((day, i) => (
                <Box key={i} padding={2}>
                  <Text size={1} weight="semibold" align="center">
                    {dayLabelFormatter.format(zonedTimeToUtc(day.year, day.month, day.day, 12, 0))}
                  </Text>
                </Box>
              ))}

              {hours.map(({ hour, minute }) => (
                <Fragment key={`row-${hour}-${minute}`}>
                  <Box padding={2}>
                    <Text size={1} muted align="right">
                      {String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}
                    </Text>
                  </Box>
                  {days.map((day, dayIndex) => {
                    const cellDate = zonedTimeToUtc(day.year, day.month, day.day, hour, minute);
                    const iso = cellDate.toISOString();
                    const existing = slotsByIso.get(iso);
                    const isPast = cellDate.getTime() <= now;
                    const isPendingAdd = pendingAdds.has(iso);
                    const isPendingRemove = existing ? pendingRemoves.has(existing.id) : false;

                    let tone: "default" | "positive" | "caution" | "primary" | "critical" = "default";
                    let disabled = false;

                    if (existing?.booked) {
                      tone = "critical";
                      disabled = true;
                    } else if (isPendingRemove) {
                      tone = "caution";
                    } else if (existing) {
                      tone = "positive";
                    } else if (isPendingAdd) {
                      tone = "primary";
                    } else if (isPast) {
                      disabled = true;
                    }

                    return (
                      <Box key={`${dayIndex}-${hour}-${minute}`} padding={1}>
                        <Button
                          mode="default"
                          tone={tone}
                          disabled={disabled}
                          onClick={() => handleCellClick(iso, existing)}
                          style={{ width: "100%", height: 32 }}
                          fontSize={1}
                          padding={2}
                          text={isPendingAdd ? "+" : isPendingRemove ? "−" : " "}
                        />
                      </Box>
                    );
                  })}
                </Fragment>
              ))}
            </Grid>
          </Card>
        )}

        <Flex align="center" justify="space-between">
          <Text size={1} muted>
            {pendingAdds.size > 0 && `${pendingAdds.size} à ajouter`}
            {pendingAdds.size > 0 && pendingRemoves.size > 0 && " · "}
            {pendingRemoves.size > 0 && `${pendingRemoves.size} à retirer`}
          </Text>
          <Button
            text={saving ? "Enregistrement…" : "Enregistrer"}
            tone="primary"
            disabled={!hasPending || saving}
            onClick={handleSave}
          />
        </Flex>
      </Stack>
    </Box>
  );
}

export const availabilityCalendarTool: Tool = {
  name: "availability",
  title: "Disponibilités",
  icon: CalendarIcon,
  component: AvailabilityCalendar,
};
