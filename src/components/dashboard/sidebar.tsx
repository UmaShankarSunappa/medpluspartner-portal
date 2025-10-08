"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { navLinks } from "@/lib/data";

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // Make dashboard link active for all sub-routes, but not for exact match of other links
    if (href === '/dashboard') {
        return pathname === href || (pathname.startsWith('/dashboard/') && navLinks.dashboard.every(l => l.href !== pathname || l.href === '/dashboard'));
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="hsl(var(--primary))"/>
                <path d="M16.9423 15.3462H15.0577V11.5769H16.9423V15.3462ZM16.9423 18.2308H15.0577V16.9231H16.9423V18.2308ZM21.9904 11.5769V21.0385H20.5481V12.8462L18.8269 13.5V12.3365L21.8077 11.0192V11.5769H21.9904ZM13.0192 11.0192V21.0385H10V11.0192H13.0192ZM11.4615 19.7692H11.5769V12.2885H11.4615V19.7692Z" fill="hsl(var(--primary-foreground))"/>
            </svg>
          <h2 className="font-bold text-lg text-foreground group-data-[collapsible=icon]:hidden">
            MedPlus
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navLinks.dashboard.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton 
                  tooltip={item.label}
                  isActive={isActive(item.href)}
                  className="w-full justify-start gap-3"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
