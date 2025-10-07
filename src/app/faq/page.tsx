
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { faqs } from "@/lib/data";

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto max-w-4xl px-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl font-bold">
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search FAQs..." className="pl-10" />
              </div>

              <h2 className="font-headline text-xl font-semibold mb-4 text-primary border-b pb-2">
                Franchisee Onboarding & Setup
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left font-medium text-base">
                      {faq.question.replace(/Q\d+\.\s/, '')}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer.replace(/A:\s/, '')}
                    </AccordionContent>
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
