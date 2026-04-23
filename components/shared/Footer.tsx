import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-foreground mb-3">WhatCanIStudy</h3>
            <p className="text-sm text-muted-foreground">
              A progressive web app helping Ghanaian students determine university program eligibility based on WASSCE grades.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-blue-600 hover:underline">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-blue-600 hover:underline">
                  Data Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/saved" className="text-blue-600 hover:underline">
                  Saved Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Notice */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Important Notice</h4>
            <p className="text-xs text-muted-foreground">
              This app uses <strong>sample data for demonstration purposes</strong>. Always verify eligibility requirements directly with institutions.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-6 text-center text-xs text-muted-foreground">
          <p>
            Last updated: December 2024 | Data Status: Demonstration Only
          </p>
        </div>
      </div>
    </footer>
  );
}
