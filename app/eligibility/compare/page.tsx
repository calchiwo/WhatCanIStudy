'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataWarning } from '@/components/shared/DataWarning';
import { EmptyState } from '@/components/shared/EmptyState';
import { Program } from '@/lib/types/program';
import programsData from '@/lib/data/programs.json';
import { CheckCircle2, XCircle, Link as LinkIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compare Programs - WhatCanIStudy',
  description: 'Compare university programs side by side to make an informed decision.',
  keywords: 'compare programs, program comparison, university choice',
};

export default function ComparisonPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const programIds = searchParams.get('programs')?.split(',') || [];
  
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (programIds.length === 0) {
      setLoading(false);
      return;
    }

    const typedPrograms = programsData as unknown as Program[];
    const selected = typedPrograms.filter((p) => programIds.includes(p.id));
    setPrograms(selected);
    setLoading(false);
  }, [programIds]);

  if (loading) {
    return <EmptyState title="Loading..." description="Preparing comparison..." />;
  }

  if (programs.length === 0) {
    return (
      <EmptyState
        title="No Programs Selected"
        description="Please select programs from the results page to compare."
        ctaText="Back to Results"
        ctaHref="/eligibility/results"
      />
    );
  }

  const allSubjects = Array.from(
    new Set(programs.flatMap((p) => p.requiredSubjects.map((s) => s.name)))
  ).sort();

  return (
    <div className="space-y-8">
      <DataWarning
        variant="info"
        title="Sample Data"
        message="This comparison is based on sample program data. Always verify with institutions before applying."
      />

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Program Comparison</h1>
        <p className="text-muted-foreground">
          Comparing {programs.length} program{programs.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Desktop: Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Card className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted">
                <th className="p-4 text-left font-semibold text-foreground">Attribute</th>
                {programs.map((program) => (
                  <th key={program.id} className="p-4 text-left font-semibold text-foreground">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{program.institutionName}</p>
                      <p>{program.programName}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Duration */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-foreground">Duration</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-4 text-foreground">
                    {program.duration}
                  </td>
                ))}
              </tr>

              {/* Type */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-foreground">Program Type</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-4 text-foreground capitalize">
                    {program.programType.replace('-', ' ')}
                  </td>
                ))}
              </tr>

              {/* Min Aggregate */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-foreground">Min Aggregate</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-4 text-foreground">
                    {program.minAggregate ? `${program.minAggregate}` : 'Not specified'}
                  </td>
                ))}
              </tr>

              {/* Required Subjects */}
              {allSubjects.map((subject) => (
                <tr key={subject} className="border-b">
                  <td className="p-4 font-semibold text-foreground">{subject}</td>
                  {programs.map((program) => {
                    const required = program.requiredSubjects.find((s) => s.name === subject);
                    if (!required) {
                      return (
                        <td key={program.id} className="p-4 text-center">
                          <XCircle className="h-5 w-5 text-muted-foreground inline" />
                        </td>
                      );
                    }
                    return (
                      <td key={program.id} className="p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-foreground">{required.minimumGrade}</span>
                          {required.isCore && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              Core
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Additional Criteria */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-foreground">Additional Info</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-4 text-sm text-foreground">
                    {program.additionalCriteria ? program.additionalCriteria : 'None'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* Mobile: Card View */}
      <div className="md:hidden space-y-4">
        {programs.map((program) => (
          <Card key={program.id} className="p-6 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">{program.institutionName}</p>
              <h3 className="text-lg font-bold text-foreground">{program.programName}</h3>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold">{program.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-semibold capitalize">{program.programType.replace('-', ' ')}</span>
              </div>
              {program.minAggregate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Aggregate</span>
                  <span className="font-semibold">{program.minAggregate}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Required Subjects</p>
              <div className="grid grid-cols-2 gap-2">
                {program.requiredSubjects.map((subject) => (
                  <div key={subject.name} className="text-xs bg-blue-50 border border-blue-200 rounded p-2">
                    <p className="font-semibold text-foreground">{subject.minimumGrade}</p>
                    <p className="text-muted-foreground">{subject.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <a href={`/program/${program.id}`} className="block">
              <Button variant="outline" className="w-full">
                <LinkIcon className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </a>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={() => router.push('/eligibility/results')}
          variant="outline"
        >
          Back to Results
        </Button>
        <Button
          onClick={() => router.push('/eligibility/input')}
          variant="ghost"
        >
          New Check
        </Button>
      </div>
    </div>
  );
}
