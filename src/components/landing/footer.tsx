import { Mountain, Twitter, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/lib/data";

export function LandingFooter() {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <Mountain className="h-6 w-6" />
              <span className="font-headline text-xl font-bold">MedPlus</span>
            </Link>
            <p className="text-muted-foreground">
              Empowering pharmacy partners with technology and support.
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:gap-12 lg:col-span-3 lg:grid-cols-3">
            <div>
              <h3 className="font-headline font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                {navLinks.footer.company.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-muted-foreground hover:text-foreground" prefetch={false}>
                            {link.label}
                        </Link>
                    </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold">Support</h3>
               <ul className="mt-4 space-y-2">
                {navLinks.footer.support.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-muted-foreground hover:text-foreground" prefetch={false}>
                            {link.label}
                        </Link>
                    </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold">Legal</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                © {new Date().getFullYear()} MedPlus Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
