"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mountain } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, isExact = true) => {
    return isExact ? pathname === href : pathname.startsWith(href);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Mountain className="size-6 text-primary" />
          <h2 className="font-headline text-lg font-semibold text-primary-foreground">
            <span className="text-foreground">MedPlus</span>
          </h2>
          <div className="grow" />
          <SidebarTrigger className="text-foreground" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navLinks.dashboard.map((item) =>
            item.subItems ? (
              <Collapsible key={item.label} defaultOpen={isActive(item.subItems[0].href, false)}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.label}
                      isActive={item.subItems.some(sub => isActive(sub.href))}
                      className="w-full justify-start"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent>
                    <div className="flex flex-col gap-1 py-1 pl-12">
                        {item.subItems.map((subItem) => (
                            <Link href={subItem.href} key={subItem.label}>
                                <Button
                                variant="ghost"
                                size="sm"
                                className={`w-full justify-start ${isActive(subItem.href) ? "bg-accent text-accent-foreground" : ""}`}
                                >
                                {subItem.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                  <SidebarMenuButton tooltip={item.label} isActive={isActive(item.href)}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          {/* Footer content can go here */}
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
