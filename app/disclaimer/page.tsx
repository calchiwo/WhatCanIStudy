import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Disclaimer & Terms - WhatCanIStudy',
  description: 'Important disclaimer: WhatCanIStudy uses sample data for demonstration. Always verify eligibility directly with universities before applying.',
  keywords: 'disclaimer, terms of use, sample data, university eligibility verification',
};

export default function DisclaimerPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Critical Notice */}
      <Alert className="bg-red-50 border-red-300">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-900 font-semibold">
          This application uses SAMPLE DATA for demonstration purposes only. Do not use for actual university applications.
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-foreground">Data Disclaimer</h1>
        <p className="text-lg text-muted-foreground">
          Important information about the data and how to use WhatCanIStudy responsibly
        </p>
      </div>

      {/* Data Status */}
      <Card className="p-6 space-y-4 border-amber-200 bg-amber-50">
        <h2 className="text-2xl font-bold text-foreground">Data Status: Sample Data Only</h2>
        <div className="space-y-3 text-foreground">
          <p>
            <strong>All program data in WhatCanIStudy is sample data created for demonstration purposes.</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            This includes:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
            <li>Program names and institution names</li>
            <li>Subject requirements and grade thresholds</li>
            <li>Program durations and descriptions</li>
            <li>Career paths and additional criteria</li>
          </ul>
        </div>
      </Card>

      {/* Accuracy Notice */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">No Guarantee of Accuracy</h2>
        <div className="space-y-3">
          <p className="text-foreground">
            Even though the data is labeled as sample data, WhatCanIStudy comes with <strong>no guarantee of accuracy or completeness</strong>.
          </p>
          <p className="text-foreground text-muted-foreground text-sm">
            University requirements change frequently and may not be reflected in any external tool. Requirements that were current yesterday may be outdated today.
          </p>
        </div>
      </Card>

      {/* What You Should Do */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What You MUST Do Before Applying</h2>
        <ol className="space-y-4">
          <li className="flex gap-4">
            <span className="font-bold text-blue-600 bg-blue-100 h-6 w-6 flex items-center justify-center rounded-full flex-shrink-0">1</span>
            <div>
              <p className="font-semibold text-foreground">Contact the university directly</p>
              <p className="text-sm text-muted-foreground">
                Call the admissions office, email them, or visit the institution in person. Get official confirmation of current requirements.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-bold text-blue-600 bg-blue-100 h-6 w-6 flex items-center justify-center rounded-full flex-shrink-0">2</span>
            <div>
              <p className="font-semibold text-foreground">Check official university websites</p>
              <p className="text-sm text-muted-foreground">
                Visit the institution's admissions page and download official prospectuses or requirement documents.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-bold text-blue-600 bg-blue-100 h-6 w-6 flex items-center justify-center rounded-full flex-shrink-0">3</span>
            <div>
              <p className="font-semibold text-foreground">Speak with school counselors</p>
              <p className="text-sm text-muted-foreground">
                Your school's guidance counselor has official information and can provide personalized advice.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-bold text-blue-600 bg-blue-100 h-6 w-6 flex items-center justify-center rounded-full flex-shrink-0">4</span>
            <div>
              <p className="font-semibold text-foreground">Get multiple confirmations</p>
              <p className="text-sm text-muted-foreground">
                Don't rely on a single source. Confirm information through multiple official channels.
              </p>
            </div>
          </li>
        </ol>
      </Card>

      {/* Limitation of Liability */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Limitation of Liability</h2>
        <div className="space-y-3 text-foreground text-muted-foreground text-sm">
          <p>
            WhatCanIStudy is provided "as is" without any warranties. We are not responsible for:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Decisions made based on information from this application</li>
            <li>Any inaccuracies in program data</li>
            <li>Any missed application deadlines or requirements</li>
            <li>Any negative outcomes resulting from reliance on this tool</li>
            <li>Availability or performance of the application</li>
            <li>Data loss or corrupted saved results</li>
          </ul>
          <p className="pt-3">
            <strong>You use this tool at your own risk. We strongly encourage you to verify all information through official sources before making any decisions.</strong>
          </p>
        </div>
      </Card>

      {/* Data Privacy */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Privacy & Data Storage</h2>
        <div className="space-y-3">
          <p className="text-foreground text-sm">
            <strong>Your data is stored locally on your device only.</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
            <li>Your grades and eligibility checks are saved in your browser's local storage</li>
            <li>This data is NOT sent to any server or external service</li>
            <li>Clearing your browser data will delete your saved results</li>
            <li>Your data is not shared with any third parties</li>
          </ul>
        </div>
      </Card>

      {/* Changes to Data */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Changes to Program Data</h2>
        <p className="text-foreground text-muted-foreground text-sm">
          University program requirements change frequently. This application may not reflect the most current requirements. The sample program data included here was created on <strong>December 1, 2024</strong> and should be considered outdated.
        </p>
      </Card>

      {/* Fair Use */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Fair Use & Attribution</h2>
        <p className="text-foreground text-muted-foreground text-sm">
          WhatCanIStudy is provided free of charge for personal educational purposes. You may not:
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm mt-3">
          <li>Reproduce or distribute the program data for commercial purposes</li>
          <li>Claim the sample data as official information from institutions</li>
          <li>Use this tool to mislead others about program requirements</li>
          <li>Republish the data without proper disclaimers</li>
        </ul>
      </Card>

      {/* Terms of Use Summary */}
      <Card className="p-6 space-y-4 bg-blue-50 border-blue-200">
        <h2 className="text-2xl font-bold text-foreground">Bottom Line</h2>
        <div className="space-y-3">
          <p className="text-foreground">
            <strong>By using WhatCanIStudy, you acknowledge that:</strong>
          </p>
          <ul className="space-y-2 text-foreground text-sm">
            <li>✓ The data is for demonstration purposes only</li>
            <li>✓ You will verify all information with institutions before applying</li>
            <li>✓ You understand there are no guarantees of accuracy</li>
            <li>✓ You take full responsibility for decisions made based on this tool</li>
            <li>✓ You will not hold WhatCanIStudy responsible for any outcomes</li>
          </ul>
        </div>
      </Card>

      {/* Last Updated */}
      <Card className="p-4 text-center text-sm text-muted-foreground">
        Last updated: December 2024 | This is demonstration software with sample data
      </Card>
    </div>
  );
}
