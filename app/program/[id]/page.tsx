'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RulesExplainer } from '@/components/forms/RulesExplainer';
import { DataWarning } from '@/components/shared/DataWarning';
import { EmptyState } from '@/components/shared/EmptyState';
import { Program } from '@/lib/types/program';
import { StudentGrades } from '@/lib/types/student';
import { evaluateProgram } from '@/lib/services/eligibility';
import programsData from '@/lib/data/programs.json';
import { CheckCircle2, Clock, Briefcase, AlertCircle, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function ProgramDetailPage() {
  const params = useParams();
  const programId = params.id as string;
  
  const [program, setProgram] = useState<Program | null>(null);
  const [studentGrades, setStudentGrades] = useState<StudentGrades | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the program
    const typedPrograms = programsData as unknown as Program[];
    const found = typedPrograms.find((p) => p.id === programId);
    setProgram(found || null);

    // Try to load student grades from session storage
    const stored = sessionStorage.getItem('studentGrades');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const studentData: StudentGrades = {
          subjects: parsed.subjects,
          examType: parsed.examType || 'wassce',
          intendedStudyArea: parsed.intendedStudyArea,
          preferredInstitutionType: parsed.preferredInstitutionType,
        };
        setStudentGrades(studentData);
      } catch (err) {
        console.error('Error loading student grades:', err);
      }
    }

    setLoading(false);
  }, [programId]);

  if (loading) {
    return <EmptyState title="Loading..." description="Retrieving program details..." />;
  }

  if (!program) {
    return (
      <EmptyState
        icon={<AlertCircle className="h-12 w-12 text-muted-foreground" />}
        title="Program Not Found"
        description="The program you're looking for doesn't exist in our database."
        ctaText="Back to Results"
        ctaHref="/eligibility/results"
      />
    );
  }

  const evaluation = studentGrades ? evaluateProgram(program, studentGrades) : null;

  return (
    <div className="space-y-8">
      <DataWarning
        variant="info"
        title="Sample Data"
        message={`This program uses sample data from ${program.lastUpdatedDate}. Always verify directly with ${program.institutionName}.`}
      />

      {/* Header */}
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">{program.institutionName}</p>
          <h1 className="text-4xl font-bold text-foreground text-balance">{program.programName}</h1>
        </div>

        {/* Quick Info */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">{program.duration}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Program Type</p>
              <p className="font-semibold text-foreground text-transform capitalize">
                {program.programType.replace('-', ' ')}
              </p>
            </div>
          </Card>

          {evaluation && (
            <Card className="p-4 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Your Match</p>
                <p className="font-semibold text-foreground">{evaluation.matchScore}%</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Eligibility Evaluation (if student has grades) */}
      {evaluation && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Your Eligibility</h2>
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2
                className={`h-6 w-6 ${
                  evaluation.eligibilityStatus === 'eligible'
                    ? 'text-green-600'
                    : evaluation.eligibilityStatus === 'close_match'
                      ? 'text-amber-600'
                      : 'text-red-600'
                }`}
              />
              <div>
                <p className="font-semibold text-foreground text-lg">
                  {evaluation.eligibilityStatus === 'eligible'
                    ? 'You are Eligible'
                    : evaluation.eligibilityStatus === 'close_match'
                      ? 'Close Match'
                      : 'Not Currently Eligible'}
                </p>
                <p className="text-sm text-muted-foreground">{evaluation.explanation}</p>
              </div>
            </div>
          </Card>

          {/* Rules Breakdown */}
          <RulesExplainer rules={evaluation.rulesChecked} />
        </section>
      )}

      {/* Requirements Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Program Requirements</h2>

        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-lg text-foreground">Required Subjects</h3>
            <div className="space-y-3">
              {program.requiredSubjects.map((subject, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 bg-muted rounded">
                  <div>
                    <p className="font-semibold text-foreground">{subject.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {subject.isCore ? 'Core Subject' : 'Required but not core'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground text-lg">{subject.minimumGrade}</p>
                    <p className="text-xs text-muted-foreground">or better</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {program.optionalSubjects && program.optionalSubjects.length > 0 && (
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-lg text-foreground">Optional Subjects</h3>
              <p className="text-sm text-muted-foreground">
                These subjects are not required but can strengthen your application.
              </p>
              <div className="space-y-2">
                {program.optionalSubjects.map((subject, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded">
                    <p className="font-semibold text-foreground">{subject.name}</p>
                    <p className="text-xs text-muted-foreground">{subject.benefitsDescription}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {program.additionalCriteria && (
            <Card className="p-6 space-y-3 border-amber-200 bg-amber-50">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Additional Criteria
              </h3>
              <p className="text-sm text-foreground">{program.additionalCriteria}</p>
            </Card>
          )}
        </div>
      </section>

      {/* Career Paths */}
      {program.typicalCareerPaths && program.typicalCareerPaths.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Typical Career Paths</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {program.typicalCareerPaths.map((path, idx) => (
              <Card key={idx} className="p-4">
                <p className="font-semibold text-foreground">{path}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Next Steps</h2>
        <Card className="p-6 space-y-4">
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1</span>
              <span className="text-foreground">
                Verify all requirements directly with <strong>{program.institutionName}</strong>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2</span>
              <span className="text-foreground">
                Check the institution's official website or contact their admissions office
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3</span>
              <span className="text-foreground">
                Prepare your application materials and meet the application deadline
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4</span>
              <span className="text-foreground">
                Submit your application through the institution's official channels
              </span>
            </li>
          </ol>

          <div className="pt-4 border-t space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
              <Share2 className="h-4 w-4" />
              Share This Program
            </Button>
            <Link href="/eligibility/results">
              <Button variant="outline" className="w-full">
                Back to Results
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Disclaimer */}
      <Card className="p-4 bg-blue-50 border-blue-200 space-y-2">
        <p className="text-sm font-semibold text-blue-900">Important Note</p>
        <p className="text-xs text-blue-800">
          This information is based on sample data updated on {program.lastUpdatedDate}. Actual requirements may have changed. Always consult directly with {program.institutionName} before applying.
        </p>
      </Card>
    </div>
  );
}
