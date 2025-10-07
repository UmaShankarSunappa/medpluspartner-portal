
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mountain } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Authentication service is not available.",
      });
      return;
    }
    initiateAnonymousSignIn(auth);
  };
  
  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
            <Link href="/" className="flex items-center gap-2 text-foreground" prefetch={false}>
                <Mountain className="h-6 w-6" />
                <span className="font-headline text-2xl font-bold">MedPlus Partner Portal</span>
            </Link>
        </div>
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="font-headline text-2xl">Partner Login</CardTitle>
            <CardDescription>
              Click below to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <Button type="submit" className="w-full">
                Enter Dashboard
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Request Access
              </Link>
            </div>
            <div className="mt-2 text-center text-sm">
                <Link href="/" className="underline text-muted-foreground">
                    Return to Homepage
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
