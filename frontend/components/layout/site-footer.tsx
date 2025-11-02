import Link from "next/link";
import type { Route } from "next";
import { Separator } from "@/components/ui/separator";

const footerLinks: Array<{ label: string; href: Route }> = [
  { label: "Syllabus Tracker", href: "/dashboard" },
  { label: "Ask Mentor", href: "/ask-upsc" },
  { label: "Upload Notes", href: "/upload-material" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="container grid gap-6 py-8 md:grid-cols-3">
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-semibold text-primary">EdgeUp AI</h3>
          <p className="text-sm text-muted-foreground">
            Crafted for UPSC aspirants seeking structured practice, smart insights, and focused revision.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Explore</h4>
          <Separator className="my-2" />
          <ul className="space-y-1 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-primary" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Stay Updated</h4>
          <Separator className="my-2" />
          <p className="text-sm text-muted-foreground">
            Access curated current affairs, model answers, and revision tips each morning.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EdgeUp AI. Built for the UPSC journey.
      </div>
    </footer>
  );
}
