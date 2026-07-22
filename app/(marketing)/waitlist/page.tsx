import type { Metadata } from "next";

import { EarlyAccessForm } from "@/components/sections/early-access-form";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Join Early Access",
  description:
    "Request early access to Chess2Fight, Song2Dance, or Halisako's developer APIs.",
  path: "/waitlist",
});

export default function WaitlistPage() {
  return (
    <div className="pt-16 sm:pt-24">
      <EarlyAccessForm />
    </div>
  );
}
