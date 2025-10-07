import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, MessageSquare, Newspaper, Users, Zap, Briefcase, DollarSign, FileText, MapPin, Target, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { placeholderImages } from "@/lib/placeholder-images.json";

const heroImage = placeholderImages.find(img => img.id === "hero-banner");
const whyPartnerImage = placeholderImages.find(img => img.id === "why-partner");
const leadershipImage = placeholderImages.find(img => img.id === "leadership-message");

const features = [
  {
    icon: <Zap className="size-6 text-primary" />,
    title: "Streamlined Operations",
    description: "Manage orders, finances, and returns from a single, intuitive dashboard.",
  },
  {
    icon: <Users className="size-6 text-primary" />,
    title: "Dedicated Support",
    description: "Access a dedicated field team and a robust complaint management system.",
  },
  {
    icon: <Newspaper className="size-6 text-primary" />,
    title: "Resources & Training",
    description: "Stay updated with the latest news, resources, and training materials.",
  },
  {
    icon: <MessageSquare className="size-6 text-primary" />,
    title: "Direct Communication",
    description: "Effortlessly communicate with the franchisor and manage invoices.",
  },
];

const missionPoints = [
  "To empower our partners with robust tools and unwavering support.",
  "To ensure seamless operations for collective growth and success.",
  "To foster a transparent and collaborative business environment.",
  "To uphold the highest standards of quality and reliability in healthcare.",
];

const requirements = [
    {
        icon: GraduationCap,
        title: "Qualified Pharmacist",
        description: "Licensed pharmacist on premises during operating hours"
    },
    {
        icon: DollarSign,
        title: "Investment Capacity",
        description: "Initial investment of ₹15-25 lakhs including setup"
    },
    {
        icon: FileText,
        title: "Drug License",
        description: "Valid drug license for retail pharmacy operations"
    },
    {
        icon: MapPin,
        title: "Minimum Space",
        description: "300-500 sq ft retail space in prime location"
    },
    {
        icon: Briefcase,
        title: "Business Commitment",
        description: "Full time dedication to store operations"
    },
    {
        icon: Target,
        title: "Local Market Knowledge",
        description: "Understanding of local healthcare needs and community"
    }
];

const howItWorksSteps = [
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
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
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Partnering for a Healthier Tomorrow
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl">
              Join the MedPlus network and leverage our comprehensive partner portal to streamline your operations, enhance growth, and serve your community better.
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

        <section id="why-partner" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
                  Why Partner With Us?
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                  A Partnership Built on Trust and Technology
                </h2>
                <p className="text-muted-foreground text-lg">
                  The MedPlus Partner Portal is your all-in-one solution for managing every aspect of your franchise. We provide the tools so you can focus on what matters most: your customers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-4">
                      {feature.icon}
                      <div>
                        <h3 className="font-headline font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                {whyPartnerImage && <Image
                  src={whyPartnerImage.imageUrl}
                  alt={whyPartnerImage.description}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                  data-ai-hint={whyPartnerImage.imageHint}
                />}
              </div>
            </div>
          </div>
        </section>

        <section id="requirements" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Franchisee Requirements</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Prerequisites for partnership</p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {requirements.map((req) => (
                        <div key={req.title} className="flex items-start gap-4">
                             <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <req.icon className="size-5" />
                            </div>
                            <div>
                                <h3 className="font-headline font-semibold">{req.title}</h3>
                                <p className="text-sm text-muted-foreground">{req.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Your journey to becoming a Medplus franchisee</p>
                </div>
                <div className="relative mt-12">
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" aria-hidden="true" />
                    <div className="space-y-12">
                        {howItWorksSteps.map((step, index) => (
                            <div key={step.title} className="relative flex items-start gap-6 lg:gap-8">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                    {step.step}
                                </div>
                                <div>
                                    <h3 className="font-headline text-xl font-semibold">{step.title}</h3>
                                    <p className="mt-1 text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        
        <section id="mission" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
               <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We are committed to building a strong, successful network of partners by providing state-of-the-art technology and dedicated support systems.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {missionPoints.map((point, index) => (
                <Card key={index} className="flex items-center p-6 transition-transform hover:scale-105 hover:shadow-xl">
                  <CheckCircle className="size-8 text-accent mr-4 shrink-0" />
                  <p className="font-medium">{point}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="leadership" className="bg-card py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden md:grid md:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                 <blockquote className="space-y-4">
                  <p className="text-xl font-medium text-foreground">
                    “Our partners are the backbone of MedPlus. We've designed this portal to be more than just a tool; it's a testament to our commitment to your success. Together, we will redefine pharmacy retail.”
                  </p>
                  <footer>
                    <div className="font-bold font-headline">Jane Doe</div>
                    <div className="text-muted-foreground">CEO, MedPlus</div>
                  </footer>
                 </blockquote>
              </div>
              <div className="relative h-64 md:h-full">
                {leadershipImage && <Image
                  src={leadershipImage.imageUrl}
                  alt={leadershipImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={leadershipImage.imageHint}
                />}
              </div>
            </Card>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
