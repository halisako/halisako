import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/shared/eyebrow";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
        This experience hasn&apos;t been orchestrated yet
      </h1>
      <p className="mt-4 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
