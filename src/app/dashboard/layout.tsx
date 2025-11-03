
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { useUser } from "@/firebase";
import { Loader2 } from "lucide-react";
import { IndentProvider } from "@/context/IndentContext";
import { StationeryOrderProvider } from "@/context/StationeryOrderContext";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { navLinks } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        MedPlus
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const handleStart = (url: string) => url !== window.location.pathname && setIsPageLoading(true);
    const handleComplete = () => setIsPageLoading(false);

    setIsPageLoading(true);
    const timer = setTimeout(() => handleComplete(), 500); 
    
    return () => clearTimeout(timer);

  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
        return pathname === href || (pathname.startsWith('/dashboard/') && navLinks.dashboard.every(l => l.href !== pathname || l.href === '/dashboard'));
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  if (isUserLoading || !user) {
    return (
       <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <IndentProvider>
      <StationeryOrderProvider>
        <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex-shrink-0 flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  {navLinks.dashboard.map((link, idx) => (
                    <SidebarLink key={idx} link={{...link, icon: <link.icon className={cn("h-5 w-5 flex-shrink-0", isActive(link.href) ? "text-primary": "text-neutral-700 dark:text-neutral-200")} />}} />
                  ))}
                </div>
              </div>
            </SidebarBody>
          </Sidebar>
          <div className="flex flex-1">
            <div className="p-0 rounded-tl-2xl border-l border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                  {isPageLoading ? (
                    <div className="flex h-full w-full items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div key={pathname} className="page-transition">
                      {children}
                    </div>
                  )}
                </main>
            </div>
          </div>
        </div>
      </StationeryOrderProvider>
    </IndentProvider>
  );
}
