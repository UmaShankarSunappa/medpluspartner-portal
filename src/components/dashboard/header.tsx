import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "./user-nav";
import { Home } from "lucide-react";
import { Button } from "../ui/button";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className="hidden md:block">
           <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
        </div>
        <div className="ml-auto flex items-center gap-4">
            <UserNav />
        </div>
    </header>
  );
}
