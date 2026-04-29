import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works: WhatCanIStudy',
  description: 'Learn how WhatCanIStudy determines university program eligibility based on WASSCE grades using transparent, rule-based logic.',
  keywords: 'university eligibility methodology, WASSCE grade evaluation, program requirements',
};

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-foreground">How It Works</h1>
        <p className="text-lg text-muted-foreground">
          Understanding how we determine your eligibility
        </p>
      </div>

      {/* Overview */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What Is WhatCanIStudy?</h2>
        <p className="text-foreground leading-relaxed">
          WhatCanIStudy helps students in Ghana and Nigeria understand which university programs match their WASSCE (West African Senior School Certificate Examination) grades. It compares your grades against publicly available program requirements to provide instant eligibility insights.
        </p>
      </Card>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How We Determine Eligibility</h2>
        
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            1. You Enter Your Grades
          </h3>
          <p className="text-foreground leading-relaxed text-muted-foreground">
            You input the subjects you took and the grades you achieved in your WASSCE examination. The app validates that you've entered actual grades.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            2. We Compare Against Requirements
          </h3>
          <p className="text-foreground leading-relaxed text-muted-foreground">
            For each program, we check:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground text-muted-foreground">
            <li>Do you have all required subjects?</li>
            <li>Are your grades at or above the minimum for each subject?</li>
            <li>Do you meet any additional criteria (if specified)?</li>
          </ul>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            3. We Categorize Results
          </h3>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-green-700">Eligible (100% match)</p>
              <p className="text-sm text-foreground">You meet all stated requirements for this program</p>
            </div>
            <div>
              <p className="font-semibold text-amber-700">Close Match (75-99%)</p>
              <p className="text-sm text-foreground">You meet most requirements but may be slightly short on a few criteria</p>
            </div>
            <div>
              <p className="font-semibold text-red-700">Not Eligible (less than 75%)</p>
              <p className="text-sm text-foreground">Based on current requirements, you don't meet the stated criteria</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            4. We Explain Every Decision
          </h3>
          <p className="text-foreground leading-relaxed text-muted-foreground">
            For each program, we show exactly which requirements you pass and which you don't, with clear explanations of why.
          </p>
        </Card>
      </section>

      {/* Key Principles */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Our Principles</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-2">
            <h3 className="font-bold text-foreground">Transparent Logic</h3>
            <p className="text-sm text-muted-foreground">
              No black boxes or probabilistic scoring. You see exactly how your grades are evaluated.
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <h3 className="font-bold text-foreground">Rule-Based, Not Guessing</h3>
            <p className="text-sm text-muted-foreground">
              We compare your grades against actual program requirements, not estimates or averages.
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <h3 className="font-bold text-foreground">Always Honest</h3>
            <p className="text-sm text-muted-foreground">
              If requirements aren't met, we say so clearly and explain what's missing.
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <h3 className="font-bold text-foreground">Verification Required</h3>
            <p className="text-sm text-muted-foreground">
              We encourage you to verify all results directly with institutions.
            </p>
          </Card>
        </div>
      </section>

      {/* Limitations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Important Limitations</h2>
        
        <Card className="p-6 space-y-4 bg-amber-50 border-amber-200">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            What We Don't Know
          </h3>
          <ul className="space-y-2 text-foreground text-muted-foreground list-disc list-inside">
            <li>
              <strong>Requirements Change:</strong> Universities update program requirements regularly. Our data may not reflect current requirements.
            </li>
            <li>
              <strong>Interview or Portfolio:</strong> Some programs require interviews, portfolios, or aptitude tests beyond grades alone.
            </li>
            <li>
              <strong>Catchment Areas:</strong> Some programs may have geographic or quota-based restrictions we can't predict.
            </li>
            <li>
              <strong>Special Cases:</strong> Universities may grant exceptions based on special circumstances we can't see.
            </li>
            <li>
              <strong>Specific Grade Combinations:</strong> Some programs may require specific subject combinations not just individual grades.
            </li>
          </ul>
        </Card>
      </section>

      {/* What To Do Next */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What Should You Do With These Results?</h2>
        
        <Card className="p-6 space-y-4">
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0 bg-blue-100 h-6 w-6 flex items-center justify-center rounded-full">1</span>
              <span className="text-foreground">
                <strong>Use this as a starting point.</strong> WhatCanIStudy shows possibilities, but shouldn't be your only research.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0 bg-blue-100 h-6 w-6 flex items-center justify-center rounded-full">2</span>
              <span className="text-foreground">
                <strong>Contact universities directly.</strong> Call, visit websites, or email the admissions office with your specific grades.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0 bg-blue-100 h-6 w-6 flex items-center justify-center rounded-full">3</span>
              <span className="text-foreground">
                <strong>Ask about close matches.</strong> If you're close but not meeting requirements, ask if alternative pathways exist.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0 bg-blue-100 h-6 w-6 flex items-center justify-center rounded-full">4</span>
              <span className="text-foreground">
                <strong>Get official guidance.</strong> School counselors and institution admissions teams are your best resources.
              </span>
            </li>
          </ol>
        </Card>
      </section>

      {/* Contact */}
      <Card className="p-6 bg-blue-50 border-blue-200 space-y-3">
        <h3 className="font-bold text-foreground">Have Questions?</h3>
        <p className="text-sm text-foreground">
          If you notice outdated program data or have feedback about how WhatCanIStudy works, please <strong>contact the institution directly</strong> to verify current requirements or reach out with your feedback.
        </p>
      </Card>
    </div>
  );
}
