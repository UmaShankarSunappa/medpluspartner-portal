import { SidebarTrigger } from "@/components/ui/sidebar";
import { StoreSwitcher } from "./store-switcher";
import { UserNav } from "./user-nav";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className="hidden md:block">
            <StoreSwitcher />
        </div>
        <div className="ml-auto flex items-center gap-4">
            <UserNav />
        </div>
    </header>
  );
}
