import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, BookOpen, Zap, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WhatCanIStudy: Check University Program Eligibility in Ghana',
  description: 'Check your eligibility for Ghanaian university programs based on WASSCE grades. Compare 50+ programs from leading institutions including Legon, KNUST, and UHAS.',
  keywords: 'university eligibility, WASSCE Ghana, program eligibility, Legon, KNUST, UHAS, tertiary education, university admission',
};

export default function LandingPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'WhatCanIStudy',
    applicationCategory: 'EducationalApplication',
    description: 'Check university program eligibility based on WASSCE grades',
    url: 'https://whatcanistudy.vercel.app',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* Hero Section */}
      <section className="space-y-6 py-12 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground text-balance">
            What Can I Study?
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Check your eligibility for university programs in Ghana. Enter your WASSCE grades and discover which programs are a perfect match for you.
          </p>
        </div>

        <Link href="/eligibility/input">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <GraduationCap className="mr-2 h-5 w-5" />
            Check Your Eligibility
          </Button>
        </Link>

        <p className="text-sm text-muted-foreground">
          Free • No sign-up required • Data for demonstration purposes
        </p>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-foreground">How It Works</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Enter Your Grades"
            description="Input your WASSCE subject grades and exam details"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Instant Analysis"
            description="Get immediate eligibility results for 50+ programs"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Transparent Logic"
            description="Understand exactly why you're eligible or not"
          />
          <FeatureCard
            icon={<GraduationCap className="h-8 w-8" />}
            title="Compare Programs"
            description="Save and compare your best-matched options"
          />
        </div>
      </section>

      {/* Information Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-foreground">Important Information</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-3">
            <h3 className="font-bold text-lg text-foreground">Sample Data</h3>
            <p className="text-sm text-muted-foreground">
              This app uses sample program data for demonstration purposes only. <strong>Always verify eligibility directly with universities</strong> before applying.
            </p>
            <Link href="/disclaimer" className="inline-block mt-2">
              <Button variant="outline" size="sm">
                View Data Disclaimer
              </Button>
            </Link>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-bold text-lg text-foreground">How Eligibility Works</h3>
            <p className="text-sm text-muted-foreground">
              We compare your grades against each program's requirements using transparent, rule-based logic. No guessing or probabilities.
            </p>
            <Link href="/about" className="inline-block mt-2">
              <Button variant="outline" size="sm">
                Learn Methodology
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 space-y-6 text-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-foreground">Ready to Explore Your Options?</h2>
          <p className="text-muted-foreground">Get started in just a few minutes</p>
        </div>
        <Link href="/eligibility/input">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <GraduationCap className="mr-2 h-5 w-5" />
            Check Your Eligibility Now
          </Button>
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 space-y-3 text-center hover:shadow-md transition-shadow">
      <div className="flex justify-center text-blue-600">
        {icon}
      </div>
      <h3 className="font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
