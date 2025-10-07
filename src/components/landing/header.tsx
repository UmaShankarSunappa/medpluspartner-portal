
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mountain } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function LandingHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const headerClasses = cn(
    "top-0 z-20 w-full px-4 lg:px-6 h-16 flex items-center transition-colors duration-300",
    isHomePage
      ? "absolute text-white bg-black/20 backdrop-blur-sm"
      : "sticky bg-card text-card-foreground border-b"
  );

  return (
    <header className={headerClasses}>
      <Link href="/" className="flex items-center justify-center">
        <Mountain className="h-6 w-6" />
        <span className="sr-only">MedPlus</span>
        <span className="font-headline text-xl font-semibold ml-2">MedPlus</span>
      </Link>
      <nav className="ml-auto hidden gap-4 sm:gap-6 lg:flex">
        {navLinks.public.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <Button asChild variant="ghost" className="hidden lg:inline-flex">
            <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild className="hidden lg:inline-flex">
            <Link href="/signup">Sign Up</Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className={cn("lg:hidden", isHomePage ? "bg-transparent border-white/50 hover:bg-white/10" : "")}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <nav className="grid gap-6 text-lg font-medium mt-16">
              {navLinks.public.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-2">
                 <Button asChild>
                    <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
