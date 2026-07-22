import { Check, X } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionTitle } from "@/components/shared/section-title";
import { Reveal } from "@/components/shared/reveal";
import { comparisonRows } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function ComparisonTable({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-4xl px-6 py-24", className)}>
      <SectionTitle
        align="center"
        eyebrow="Why Halisako"
        title="Orchestration is a different discipline"
      />
      <Reveal className="mt-14 overflow-hidden rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-left text-muted-foreground" />
              <TableHead className="border-l border-border text-muted-foreground">
                Traditional AI
              </TableHead>
              <TableHead className="border-l border-border text-gold-primary">
                Halisako
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonRows.map((c) => (
              <TableRow key={c.row} className="hover:bg-transparent">
                <TableCell className="text-muted-foreground">{c.row}</TableCell>
                <TableCell className="border-l border-border">
                  <X size={16} className="mx-auto text-silver" />
                </TableCell>
                <TableCell className="border-l border-border">
                  <div className="flex items-center justify-center gap-2">
                    <Check size={16} className="shrink-0 text-gold-primary" />
                    <span className="hidden sm:inline">{c.halText}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Reveal>
    </section>
  );
}
