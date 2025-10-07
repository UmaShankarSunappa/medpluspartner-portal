
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function AboutUsPage() {
  const historyItems = [
    "MedPlus was founded in 2006 in Hyderabad",
    "Today, MedPlus operates over 4,230+ stores across 600+ cities",
    "We have built a trusted brand in pharmacy retail, e-pharmacy, and associated health services",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-4xl font-bold">About Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h2 className="font-headline text-2xl font-semibold">Mission & Vision</h2>
                <p className="mt-2 text-muted-foreground">
                  At MedPlus, we believe in delivering trusted healthcare and wellness to every consumer. Through our expansive pharmacy network, we strive for accessibility, product integrity, and continuous innovation. Our franchise partners are vital to this mission — together, we commit to mutual growth, operational excellence, and service leadership.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl font-semibold">Brief History & Shared Success</h2>
                <ul className="mt-4 space-y-3">
                  {historyItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border-l-4 border-primary bg-accent/50 p-6">
                <h2 className="font-headline text-2xl font-semibold">Message from Leadership</h2>
                <blockquote className="mt-4 italic text-muted-foreground">
                  "To our valued franchise partners: you are not just store owners — you are the face of the MedPlus promise in your community. We commit to providing you the operational support, training, and innovations you need to succeed. Let us grow together."
                </blockquote>
                <p className="mt-4 text-right font-semibold text-accent-foreground">
                  — MedPlus Leadership Team
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
