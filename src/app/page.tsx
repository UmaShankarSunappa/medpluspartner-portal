
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, DollarSign, FileText, GraduationCap, Headset, MapPin, Target, Users, Library, LineChart, Cpu, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const heroImage = placeholderImages.find(img => img.id === "hero-banner");
const whyPartnerImage = placeholderImages.find(img => img.id === "why-partner");

const features = [
  {
    icon: <Library className="size-8 text-primary" />,
    title: "Brand Recognition",
    description: "Leverage the trust of India's leading pharmacy chain with 4,230+ stores.",
  },
  {
    icon: <LineChart className="size-8 text-primary" />,
    title: "Supply Chain Efficiency",
    description: "Access to centralized procurement and efficient distribution network.",
  },
  {
    icon: <Cpu className="size-8 text-primary" />,
    title: "Technology Support",
    description: "Modern POS systems, inventory management, and digital tools.",
  },
  {
    icon: <Headset className="size-8 text-primary" />,
    title: "Ongoing Support",
    description: "Comprehensive training, marketing support, and dedicated assistance.",
  },
];

const requirements = [
    {
        icon: CheckCircle,
        title: "Qualified Pharmacist",
        description: "Licensed pharmacist on premises during operating hours"
    },
    {
        icon: CheckCircle,
        title: "Investment Capacity",
        description: "Initial investment of ₹15-25 lakhs including setup"
    },
    {
        icon: CheckCircle,
        title: "Drug License",
        description: "Valid drug license for retail pharmacy operations"
    },
    {
        icon: CheckCircle,
        title: "Minimum Space",
        description: "300-500 sq ft retail space in prime location"
    },
    {
        icon: CheckCircle,
        title: "Business Commitment",
        description: "Full-time dedication to store operations"
    },
    {
        icon: CheckCircle,
        title: "Local Market Knowledge",
        description: "Understanding of local healthcare needs and community"
    }
];

const convertingPharmacySteps = [
    {
        step: 1,
        title: "Submit Application",
        description: "Fill out the franchise application form with your details and location preferences"
    },
    {
        step: 2,
        title: "Initial Screening",
        description: "Our team reviews your application and conducts preliminary assessment"
    },
    {
        step: 3,
        title: "Site Evaluation",
        description: "Location assessment and feasibility study by our business development team"
    },
    {
        step: 4,
        title: "Agreement & Training",
        description: "Sign franchise agreement and complete comprehensive training program"
    },
    {
        step: 5,
        title: "Store Setup",
        description: "Store design, inventory setup, and technology installation with our support"
    },
    {
        step: 6,
        title: "Grand Opening",
        description: "Launch your Medplus store with marketing support and ongoing assistance"
    }
];

const newFranchiseeSteps = [
    {
        step: 1,
        title: "Submit Application",
        description: "Fill out the franchise application with your details."
    },
    {
        step: 2,
        title: "Initial Screening",
        description: "Our team reviews your application for suitability."
    },
    {
        step: 3,
        title: "Available Store Allocation",
        description: "We'll match you with an available store location."
    },
    {
        step: 4,
        title: "Agreement and Training",
        description: "Sign the franchise agreement and undergo training."
    },
    {
        step: 5,
        title: "Grand Opening",
        description: "Launch your new MedPlus store with our full support."
    }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32">
           {heroImage && <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover object-center"
              priority
              data-ai-hint={heroImage.imageHint}
            />}
          <div className="absolute inset-0 bg-black/50" />
          <div className="container relative z-10 mx-auto px-4 text-center text-primary-foreground">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Partnering for a Healthier Tomorrow
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg">
              Join India's leading pharmacy retail chain and be part of a trusted healthcare network serving millions of customers across the nation.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/signup">
                  Become a Partner <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link href="/login">Existing Partner Login</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="why-partner" className="py-4">
            <div className="container mx-auto px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Why Partner with Medplus?</CardTitle>
                        <p className="text-muted-foreground">Key benefits of becoming a franchisee</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex flex-col items-center gap-4">
                                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-headline font-semibold text-lg">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>

        <section id="requirements" className="py-4">
            <div className="container mx-auto px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Franchisee Requirements</CardTitle>
                        <p className="text-muted-foreground">Prerequisites for partnership</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {requirements.map((req) => (
                                <div key={req.title} className="flex items-start gap-3">
                                    <req.icon className="size-6 text-primary mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-headline font-semibold">{req.title}</h3>
                                        <p className="text-sm text-muted-foreground">{req.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>

        <section id="how-it-works" className="py-4">
          <div className="container mx-auto px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">How It Works</CardTitle>
                    <p className="text-muted-foreground">Your journey to becoming a Medplus franchisee</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    
                    <div>
                        <h3 className="font-headline text-xl font-bold mb-8">Converting Existing Pharmacy</h3>
                        <div className="relative">
                        <div className="absolute left-6 top-0 h-full w-px -translate-x-1/2 bg-border" aria-hidden="true" />
                        <div className="space-y-12">
                            {convertingPharmacySteps.map((step) => (
                            <div key={step.title} className="relative flex items-start gap-6">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                {step.step}
                                </div>
                                <div>
                                <h4 className="font-headline text-lg font-semibold">{step.title}</h4>
                                <p className="mt-1 text-muted-foreground text-sm">{step.description}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-headline text-xl font-bold mb-8">Taking a New Franchisee</h3>
                        <div className="relative">
                        <div className="absolute left-6 top-0 h-full w-px -translate-x-1/2 bg-border" aria-hidden="true" />
                        <div className="space-y-12">
                            {newFranchiseeSteps.map((step) => (
                            <div key={step.title} className="relative flex items-start gap-6">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                {step.step}
                                </div>
                                <div>
                                <h4 className="font-headline text-lg font-semibold">{step.title}</h4>
                                <p className="mt-1 text-muted-foreground text-sm">{step.description}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>

                    </div>
                </CardContent>
            </Card>
          </div>
        </section>
        
      </main>
      <LandingFooter />
    </div>
  );
}

    

    
