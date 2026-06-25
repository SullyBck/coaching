"use client";

import { type FormEvent, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { AppointmentSlot } from "@/content/types";
import { Button } from "@/components/ui/Button";

type Status = "loading" | "idle" | "submitting" | "success";

async function fetchAvailableSlots(): Promise<AppointmentSlot[]> {
  try {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    return data.slots ?? [];
  } catch {
    return [];
  }
}

function dateKeyFor(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function BookingWidget({ showHeading = true }: { showHeading?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("booking");
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorKey, setErrorKey] = useState<"conflict" | "genericError" | null>(null);

  useEffect(() => {
    let active = true;
    fetchAvailableSlots().then((result) => {
      if (active) {
        setSlots(result);
        setStatus("idle");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleConfirm(event: FormEvent) {
    event.preventDefault();
    if (!selectedSlotId) return;

    setStatus("submitting");
    setErrorKey(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: selectedSlotId, name, email }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      const data = await res.json().catch(() => ({}));
      setErrorKey(data.error === "slot_unavailable" ? "conflict" : "genericError");
      setSelectedDateKey(null);
      setSelectedSlotId(null);
      setStatus("idle");
      setSlots(await fetchAvailableSlots());
    } catch {
      setErrorKey("genericError");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-2">
        {showHeading && (
          <h2 className="font-display text-xl text-navy">{t("heading")}</h2>
        )}
        <p className="text-navy/80">{t("success")}</p>
      </div>
    );
  }

  const groups = new Map<string, AppointmentSlot[]>();
  for (const slot of slots) {
    const key = dateKeyFor(new Date(slot.start));
    const group = groups.get(key) ?? [];
    group.push(slot);
    groups.set(key, group);
  }

  const dateChipFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Europe/Paris",
  });
  const dateHeadingFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
    timeZone: "Europe/Paris",
  });
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    timeStyle: "short",
    timeZone: "Europe/Paris",
  });

  const dateKeys = Array.from(groups.keys());
  const daySlots = selectedDateKey ? groups.get(selectedDateKey) ?? [] : [];

  return (
    <div className="flex flex-col gap-6">
      {showHeading && (
        <h2 className="font-display text-xl text-navy">{t("heading")}</h2>
      )}

      {errorKey && (
        <p className="text-sm text-navy/70">{t(errorKey)}</p>
      )}

      {status === "loading" ? null : dateKeys.length === 0 ? (
        <p className="text-sm text-navy/60">{t("noSlots")}</p>
      ) : !selectedDateKey ? (
        <div className="flex flex-wrap gap-2">
          {dateKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedDateKey(key)}
              className="border border-navy/20 px-3 py-2 text-sm text-navy transition-colors hover:border-gold"
            >
              {dateChipFormatter.format(new Date(`${key}T12:00:00`))}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              setSelectedDateKey(null);
              setSelectedSlotId(null);
            }}
            className="self-start text-xs tracking-wide text-navy/50 hover:text-gold"
          >
            ← {t("changeDate")}
          </button>
          <p className="text-sm text-navy/60">
            {dateHeadingFormatter.format(new Date(`${selectedDateKey}T12:00:00`))}
          </p>
          <div className="flex flex-wrap gap-2">
            {daySlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlotId(slot.id)}
                className={
                  slot.id === selectedSlotId
                    ? "border border-navy bg-navy px-4 py-2 text-sm text-white"
                    : "border border-navy/20 px-4 py-2 text-sm text-navy transition-colors hover:border-gold"
                }
              >
                {timeFormatter.format(new Date(slot.start))}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedSlotId && (
        <form onSubmit={handleConfirm} className="flex flex-col gap-4">
          <div>
            <label htmlFor="booking-name" className="mb-1 block text-sm text-navy/70">
              {t("name")}
            </label>
            <input
              id="booking-name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full border border-navy/20 px-4 py-3 focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="booking-email" className="mb-1 block text-sm text-navy/70">
              {t("email")}
            </label>
            <input
              id="booking-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border border-navy/20 px-4 py-3 focus:border-gold focus:outline-none"
            />
          </div>
          <Button type="submit" className="self-start" disabled={status === "submitting"}>
            {status === "submitting" ? t("submitting") : t("confirm")}
          </Button>
        </form>
      )}
    </div>
  );
}
