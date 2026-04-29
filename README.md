# WhatCanIStudy: University Program Eligibility Checker

A progressive web app (PWA) that helps Ghanaian and Nigerian students determine which university programs match their WASSCE (West African Senior School Certificate Examination) grades.

<img width="2535" height="1183" alt="Screenshot 2026-04-27 191347" src="https://github.com/user-attachments/assets/9512cd15-e104-4b09-a773-eb59b27cbf48" />

Live: [https://whatcanistudy.vercel.app](https://whatcanistudy.vercel.app)

## Overview

WhatCanIStudy provides:
- **Grade Input Form**: Step-by-step form for entering WASSCE subjects and grades
- **Eligibility Analysis**: Deterministic, rule-based evaluation against program requirements
- **Program Comparison**: Side-by-side comparison of up to 3 programs
- **Saved Results**: Local storage of eligibility checks with history
- **Transparent Logic**: Clear explanation of why you are or aren't eligible
- **PWA Capabilities**: Works offline, installable as app, offline support

## Key Features

- **8 Main Pages**:
  - Landing page with app overview
  - Grade input form (4-step wizard)
  - Eligibility results with categorized programs
  - Individual program detail pages
  - Program comparison tool
  - Saved results history
  - About/Methodology page
  - Data disclaimer page

- **Reusable Components**:
  - FormStepCard: Step-by-step form wrapper
  - MatchScoreBadge: Visual eligibility status indicator
  - RulesExplainer: Detailed rule-by-rule breakdown
  - ResultCard: Individual program result display
  - Header, Footer, EmptyState, DataWarning

- **Data Layer**:
  - TypeScript types for programs and student grades
  - Eligibility rules engine (deterministic scoring)
  - WASSCE subject database
  - Grade scale mapping (A1-F9)
  - Sample program data (5 programs across major institutions)

- **PWA Features**:
  - Web app manifest (manifest.json)
  - Service worker for offline caching
  - Offline fallback page
  - Mobile-first responsive design
  - Installable as mobile/desktop app
  - App icons (192px, 512px, 96px, maskable)

## Project Structure

```
app/
  layout.tsx              # Root layout with Header/Footer
  page.tsx               # Landing page
  eligibility/
    input/page.tsx       # Grade input wizard
    results/page.tsx     # Results display
    compare/page.tsx     # Program comparison
  program/
    [id]/page.tsx        # Individual program detail
  saved/page.tsx         # Saved results history
  about/page.tsx         # Methodology page
  disclaimer/page.tsx    # Data disclaimer

components/
  forms/
    FormStepCard.tsx
    MatchScoreBadge.tsx
    RulesExplainer.tsx
    ResultCard.tsx
  shared/
    Header.tsx
    Footer.tsx
    EmptyState.tsx
    DataWarning.tsx

lib/
  types/
    program.ts          # Program interfaces
    student.ts          # Student grade types
  data/
    programs.json       # Sample program data
    subjects.ts         # WASSCE subjects & grades
  services/
    eligibility.ts      # Eligibility rules engine

public/
  manifest.json         # PWA manifest
  sw.js                # Service worker
  offline.html         # Offline fallback page
  icon-*.png          # App icons
```

## Important Notes

### Sample Data
- All program data is **sample/demonstration data only**
- Created for educational purposes
- **Not for actual university applications**
- Users MUST verify with institutions directly

### Data Flow
1. User enters WASSCE grades on input page
2. Grades stored in sessionStorage (not persisted)
3. Eligibility engine evaluates all programs
4. Results categorized as: Eligible / Close Match / Not Eligible
5. User can save results to localStorage for history

### Eligibility Logic
- **100% Match (Eligible)**: All required subjects present with grades at or above minimum
- **75-99% Match (Close)**: Most requirements met but some gaps
- **<75% (Not Eligible)**: Significant gaps in requirements

### Local Storage
- Saved checks stored in `eligibilityChecks` localStorage key
- Keeps last 10 checks
- Cleared when user deletes results
- Not synced across devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19 + Tailwind CSS
- **Components**: shadcn/ui (pre-installed)
- **Icons**: Lucide React
- **State**: React hooks + sessionStorage/localStorage
- **Forms**: React hook form + Zod
- **Type Safety**: Full TypeScript

## Getting Started

### Development
```bash
npm install
npm dev
```
Then visit http://localhost:3000

### Build
```bash
npm build
npm start
```

## User Workflow

1. **Landing Page** → User clicks "Check Your Eligibility"
2. **Input Form** → Step 1-4 wizard collects grades
3. **Results Page** → Shows eligible, close, not eligible programs
4. **Program Detail** → User can view individual program requirements
5. **Compare** → User can compare up to 3 programs
6. **Save** → Results stored for history on Saved Results page

## Accessibility

- Semantic HTML (proper heading hierarchy, form labels)
- WCAG AA color contrast maintained
- Keyboard navigation support
- Screen reader friendly (aria-labels, descriptions)
- Form validation with inline error messages
- Mobile-first responsive (320px+)
- Touch-friendly targets (48px minimum)

## PWA Installation

1. **Web**: Add to home screen from browser menu
2. **Mobile**: Install app from app install prompt
3. **Desktop**: Install from browser settings

## Customization

### Add More Programs
1. Edit `lib/data/programs.json`
2. Follow existing program structure
3. Ensure required subjects and grades are specified

### Change Colors
1. Update Tailwind theme in `tailwind.config.ts`
2. Colors used: Blue (#2563eb primary), Green (eligible), Amber (close), Red (not eligible)

### Add More Pages
1. Create new route in `app/` directory
2. Import Header/Footer components
3. Follow existing page structure

## Limitations & Future Improvements

**Current Limitations**:
- Sample data only (not real program requirements)
- No multi-language support
- No user accounts or authentication
- Data stored locally (not synced)
- No real-time university data integration

**Potential Improvements**:
- Backend database with real program data
- User authentication and accounts
- Real-time data sync across devices
- Multi-language support (English, Twi, etc.)
- University direct integration
- Email notifications
- Advanced filtering and search
- Counselor/advisor dashboard

## Support & Feedback

This is a demonstration application. For real eligibility checks, always:
1. Contact universities directly
2. Verify with official admissions websites
3. Speak with school counselors
4. Check official prospectuses

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Caleb Wodi

- Email: calebwodi33@gmail.com
- LinkedIn: [@calchiwo](https://linkedin.com/in/calchiwo)
- Twitter: [@calchiwo](https://x.com/calchiwo)
