
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserNav } from "./user-nav";
import { StoreSwitcher } from "./store-switcher";
import { ShoppingCart } from 'lucide-react';
import { useIndent } from '@/context/IndentContext';

export function DashboardHeader() {
  const { orderItems } = useIndent();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
        <div className="hidden md:flex items-center gap-4">
           <StoreSwitcher />
        </div>
        <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/dashboard/indent">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {orderItems.length}
                </span>
                <span className="sr-only">Open Indent</span>
              </Link>
            </Button>
            <UserNav />
        </div>
    </header>
  );
}
