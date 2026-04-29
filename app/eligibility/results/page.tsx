'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResultCard } from '@/components/forms/ResultCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { DataWarning } from '@/components/shared/DataWarning';
import { StudentGrades } from '@/lib/types/student';
import { Program, EligibilityResult } from '@/lib/types/program';
import { evaluateAllPrograms } from '@/lib/services/eligibility';
import programsData from '@/lib/data/programs.json';
import { Bookmark, Share2, BarChart3 } from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const [studentGrades, setStudentGrades] = useState<StudentGrades | null>(null);
  const [country, setCountry] = useState<'Ghana' | 'Nigeria' | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [eligiblePrograms, setEligiblePrograms] = useState<EligibilityResult[]>([]);
  const [closeMatches, setCloseMatches] = useState<EligibilityResult[]>([]);
  const [notEligiblePrograms, setNotEligiblePrograms] = useState<EligibilityResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForComparison, setSelectedForComparison] = useState<EligibilityResult[]>([]);

  useEffect(() => {
    // Load student grades from session storage
    const stored = sessionStorage.getItem('studentGrades');
    if (!stored) {
      router.push('/eligibility/input');
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      const studentData: StudentGrades = {
        subjects: parsed.subjects,
        examType: parsed.examType || 'wassce',
        intendedStudyArea: parsed.intendedStudyArea,
        preferredInstitutionType: parsed.preferredInstitutionType,
      };
      setStudentGrades(studentData);
      setCountry(parsed.country);

      // Cast programsData to Program[] and filter by country
      const typedPrograms = (programsData as unknown as Program[]).filter(
        (p) => p.country === parsed.country
      );
      setPrograms(typedPrograms);

      // Evaluate all programs
      const results = evaluateAllPrograms(typedPrograms, studentData);
      setEligiblePrograms(results.eligiblePrograms);
      setCloseMatches(results.closeMatches);
      setNotEligiblePrograms(results.notEligiblePrograms);

      // Save to localStorage for history
      const check = {
        timestamp: Date.now(),
        studentGrades: studentData,
        results: results,
      };
      const checks = JSON.parse(localStorage.getItem('eligibilityChecks') || '[]');
      checks.unshift(check);
      // Keep last 10 checks
      localStorage.setItem('eligibilityChecks', JSON.stringify(checks.slice(0, 10)));

      setLoading(false);
    } catch (err) {
      console.error('Error processing grades:', err);
      setLoading(false);
    }
  }, [router]);

  const handleAddToComparison = (result: EligibilityResult) => {
    if (selectedForComparison.find((r) => r.programId === result.programId)) {
      setSelectedForComparison(selectedForComparison.filter((r) => r.programId !== result.programId));
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison([...selectedForComparison, result]);
    }
  };

  const handleCompare = () => {
    if (selectedForComparison.length > 0) {
      const programIds = selectedForComparison.map((r) => r.programId).join(',');
      router.push(`/eligibility/compare?programs=${programIds}`);
    }
  };

  const handleSaveResults = () => {
    const check = {
      timestamp: Date.now(),
      studentGrades,
      eligible: eligiblePrograms.length,
      close: closeMatches.length,
      notEligible: notEligiblePrograms.length,
    };
    const checks = JSON.parse(localStorage.getItem('eligibilityChecks') || '[]');
    // Update the most recent one
    if (checks.length > 0) {
      checks[0] = check;
    } else {
      checks.push(check);
    }
    localStorage.setItem('eligibilityChecks', JSON.stringify(checks.slice(0, 10)));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <EmptyState
          icon={<BarChart3 className="h-12 w-12 text-muted-foreground" />}
          title="Analyzing Your Eligibility"
          description="Processing your grades and checking against program requirements..."
        />
      </div>
    );
  }

  if (!studentGrades) {
    return (
      <div className="space-y-6">
        <EmptyState
          icon={<BarChart3 className="h-12 w-12 text-muted-foreground" />}
          title="No Data Found"
          description="Please enter your grades to check eligibility."
          ctaText="Enter Your Grades"
          ctaHref="/eligibility/input"
        />
      </div>
    );
  }

  const totalPrograms = eligiblePrograms.length + closeMatches.length + notEligiblePrograms.length;

  return (
    <div className="space-y-8">
      <DataWarning
        variant="info"
        title="Sample Data Results"
        message="These results are based on sample program data. Always contact institutions directly to verify your eligibility before applying."
      />

      {/* Country Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Eligibility Results</h1>
          <p className="text-muted-foreground mt-2">Institutions in {country}</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/eligibility/input')}>
          Check Again
        </Button>
      </div>

      {/* Summary Stats */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Eligible Programs</p>
            <p className="text-3xl font-bold text-green-600">{eligiblePrograms.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Close Matches</p>
            <p className="text-3xl font-bold text-amber-600">{closeMatches.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Not Eligible</p>
            <p className="text-3xl font-bold text-red-600">{notEligiblePrograms.length}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-200 text-sm text-muted-foreground">
          Analyzed {totalPrograms} programs across multiple institutions
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <Button
          onClick={handleSaveResults}
          variant="outline"
          className="gap-2"
        >
          <Bookmark className="h-4 w-4" />
          Save These Results
        </Button>
        {selectedForComparison.length > 0 && (
          <Button
            onClick={handleCompare}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Compare {selectedForComparison.length} Program{selectedForComparison.length !== 1 ? 's' : ''}
          </Button>
        )}
        <Button
          onClick={() => router.push('/eligibility/input')}
          variant="ghost"
        >
          New Check
        </Button>
      </div>

      {/* Eligible Programs */}
      {eligiblePrograms.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-foreground">You're Eligible For</h2>
            <span className="text-sm text-muted-foreground">({eligiblePrograms.length})</span>
          </div>
          <div className="space-y-4">
            {eligiblePrograms.map((result) => (
              <div key={result.programId} className="flex gap-3">
                <input
                  type="checkbox"
                  checked={selectedForComparison.some((r) => r.programId === result.programId)}
                  onChange={() => handleAddToComparison(result)}
                  className="mt-1"
                  aria-label={`Select ${result.programName} for comparison`}
                />
                <div className="flex-1">
                  <ResultCard result={result} onCompareClick={handleAddToComparison} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Close Matches */}
      {closeMatches.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-foreground">Close Matches</h2>
            <span className="text-sm text-muted-foreground">({closeMatches.length})</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You're close! Consider contacting these institutions about your eligibility.
          </p>
          <div className="space-y-4">
            {closeMatches.map((result) => (
              <div key={result.programId} className="flex gap-3">
                <input
                  type="checkbox"
                  checked={selectedForComparison.some((r) => r.programId === result.programId)}
                  onChange={() => handleAddToComparison(result)}
                  className="mt-1"
                  aria-label={`Select ${result.programName} for comparison`}
                />
                <div className="flex-1">
                  <ResultCard result={result} onCompareClick={handleAddToComparison} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Not Eligible */}
      {notEligiblePrograms.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-foreground">Not Eligible (Based on Current Data)</h2>
            <span className="text-sm text-muted-foreground">({notEligiblePrograms.length})</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You may not meet current requirements, but always contact institutions to discuss alternative pathways.
          </p>
          <div className="space-y-4">
            {notEligiblePrograms.slice(0, 3).map((result) => (
              <ResultCard key={result.programId} result={result} onCompareClick={handleAddToComparison} />
            ))}
            {notEligiblePrograms.length > 3 && (
              <Card className="p-4 text-center text-sm text-muted-foreground">
                +{notEligiblePrograms.length - 3} more programs not matching your current requirements
              </Card>
            )}
          </div>
        </section>
      )}

      {/* No Results */}
      {totalPrograms === 0 && (
        <EmptyState
          title="No Programs Found"
          description="Unable to process your eligibility check. Please try again."
          ctaText="Enter Your Grades Again"
          ctaHref="/eligibility/input"
        />
      )}
    </div>
  );
}
