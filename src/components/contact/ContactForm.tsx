"use client";

import { type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-navy/80">{t("success")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-navy/70">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={t("namePlaceholder")}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full border border-navy/20 px-4 py-3 focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-navy/70">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full border border-navy/20 px-4 py-3 focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-navy/70">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={t("messagePlaceholder")}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full border border-navy/20 px-4 py-3 focus:border-gold focus:outline-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-navy/70">{t("error")}</p>
      )}
      <Button type="submit" className="self-start" disabled={status === "submitting"}>
        {status === "submitting" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
