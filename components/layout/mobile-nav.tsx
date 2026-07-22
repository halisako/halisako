"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { navLinks, siteConfig } from "@/lib/site-config";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
          <Menu size={22} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{siteConfig.name}</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link href={link.href} className="text-base font-medium">
                {link.label}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <a
              href={siteConfig.links.github}
              className="flex items-center gap-2 text-base font-medium text-muted-foreground"
            >
              <Github size={17} /> GitHub
            </a>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild className="mt-2">
              <Link href="/waitlist">Join Early Access</Link>
            </Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
