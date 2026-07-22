"use client";

import * as React from "react";
import { Check, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionTitle } from "@/components/shared/section-title";
import { Reveal } from "@/components/shared/reveal";
import { interestOptions } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function EarlyAccessForm({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [interest, setInterest] = React.useState<string>(interestOptions[0]);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      interest,
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className={cn("mx-auto max-w-2xl px-6 py-24", className)}>
      <SectionTitle
        align="center"
        eyebrow="Early Access"
        title="Be first to orchestrate"
        description="Leave your details and we'll reach out as soon as your product of interest opens up."
      />

      <Reveal className="mt-12 rounded-lg border border-border bg-card p-8 sm:p-10">
        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-accent">
              <Check size={20} className="text-gold-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold">You&apos;re on the list</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ll email you as soon as {interest} is ready.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <div className="flex items-center gap-2 rounded-md border border-input px-3 focus-within:ring-2 focus-within:ring-gold-primary">
                  <User size={15} className="text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Ada Lovelace"
                    className="border-0 px-0 shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2 rounded-md border border-input px-3 focus-within:ring-2 focus-within:ring-gold-primary">
                  <Mail size={15} className="text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="ada@example.com"
                    className="border-0 px-0 shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="interest">Interest</Label>
              <Select value={interest} onValueChange={setInterest} name="interest">
                <SelectTrigger id="interest">
                  <SelectValue placeholder="Select an interest" />
                </SelectTrigger>
                <SelectContent>
                  {interestOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="mt-2" disabled={status === "loading"}>
              {status === "loading" ? "Requesting…" : "Request Access"}
            </Button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
