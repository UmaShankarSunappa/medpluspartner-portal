import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mountain, ShieldCheck, Mail } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8 flex justify-center">
            <Link href="/" className="flex items-center gap-2 text-foreground" prefetch={false}>
                <Mountain className="h-6 w-6" />
                <span className="font-headline text-2xl font-bold">MedPlus Partner Portal</span>
            </Link>
        </div>
        <Card>
          <CardHeader className="space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Access to the Partner Portal</CardTitle>
            <CardDescription className="text-base">
              Our partner portal is an exclusive platform for approved MedPlus franchisees.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-headline text-lg font-semibold">How to get access:</h3>
              <p className="mt-2 text-muted-foreground">
                Account activation is handled directly by our administrative team. Once your franchise agreement is finalized, you will receive an activation link via email to set up your account.
              </p>
            </div>

            <div>
                 <h3 className="font-headline text-lg font-semibold">Already a Partner?</h3>
                 <p className="mt-2 text-muted-foreground">
                    If you are an approved partner and have not received your activation link, please contact our support team.
                 </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Contact Partner Support
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/login">
                  Return to Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
