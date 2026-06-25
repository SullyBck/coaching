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

export function BookingWidget() {
  const locale = useLocale();
  const t = useTranslations("booking");
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [status, setStatus] = useState<Status>("loading");
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
        <h2 className="font-display text-xl text-navy">{t("heading")}</h2>
        <p className="text-navy/80">{t("success")}</p>
      </div>
    );
  }

  const groups = new Map<string, AppointmentSlot[]>();
  for (const slot of slots) {
    const dateLabel = new Intl.DateTimeFormat(locale, {
      dateStyle: "full",
      timeZone: "Europe/Paris",
    }).format(new Date(slot.start));
    const group = groups.get(dateLabel) ?? [];
    group.push(slot);
    groups.set(dateLabel, group);
  }

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    timeStyle: "short",
    timeZone: "Europe/Paris",
  });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-xl text-navy">{t("heading")}</h2>

      {errorKey && (
        <p className="text-sm text-navy/70">{t(errorKey)}</p>
      )}

      {status === "loading" ? null : groups.size === 0 ? (
        <p className="text-sm text-navy/60">{t("noSlots")}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {Array.from(groups.entries()).map(([dateLabel, daySlots]) => (
            <div key={dateLabel} className="flex flex-col gap-2">
              <p className="text-sm text-navy/60">{dateLabel}</p>
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
          ))}
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
