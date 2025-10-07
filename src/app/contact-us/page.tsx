
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, Clock } from "lucide-react";

const contactDetails = [
    { state: "Andhra Pradesh & Telangana", phone: "+91 86885 81100" },
    { state: "Maharashtra", phone: "+91 86885 81101" },
    { state: "Tamil Nadu", phone: "+91 86885 81102" },
    { state: "Karnataka", phone: "+91 86885 81103" },
    { state: "West Bengal", phone: "+91 86885 81104" },
    { state: "Madhya Pradesh", phone: "+91 86885 81105" },
    { state: "Chhattisgarh", phone: "+91 86885 81106" },
];

export default function ContactUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl font-bold">Contact Us</CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h2 className="font-headline text-2xl font-semibold border-b pb-2">Franchisee Relations / Business Development</h2>
                <div className="mt-6 space-y-6">
                    <div className="flex items-start gap-4">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg">Email</h3>
                            <a href="mailto:franchise@medplusindia.com" className="text-muted-foreground hover:text-primary">
                                franchise@medplusindia.com
                            </a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Phone className="h-6 w-6 text-primary mt-1" />
                        <div>
                             <h3 className="font-semibold text-lg">Phone Numbers (State-wise)</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mt-2">
                                {contactDetails.map((contact) => (
                                <div key={contact.state} className="rounded-lg border p-3">
                                    <p className="font-medium">{contact.state}</p>
                                    <p className="text-muted-foreground">{contact.phone}</p>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Clock className="h-6 w-6 text-primary mt-1" />
                        <div>
                             <h3 className="font-semibold text-lg">Hours of Operation</h3>
                             <p className="text-muted-foreground">Monday – Friday, 9:30 AM – 5:30 PM IST</p>
                        </div>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
