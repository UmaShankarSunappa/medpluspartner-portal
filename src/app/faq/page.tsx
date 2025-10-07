
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { faqs } from "@/lib/data";

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto max-w-4xl px-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-4xl font-bold">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className="font-headline text-2xl font-semibold mb-6">Franchisee Onboarding & Setup</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
