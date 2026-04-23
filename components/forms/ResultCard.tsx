'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EligibilityResult } from '@/lib/types/program';
import { MatchScoreBadge } from './MatchScoreBadge';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ResultCardProps {
  result: EligibilityResult;
  onCompareClick?: (result: EligibilityResult) => void;
}

export function ResultCard({ result, onCompareClick }: ResultCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <p className="text-sm text-muted-foreground">{result.institutionName}</p>
          <h3 className="text-lg font-bold text-foreground">{result.programName}</h3>
        </div>

        {/* Match Score */}
        <div>
          <MatchScoreBadge score={result.matchScore} confidenceLevel={result.confidenceLevel} />
        </div>

        {/* Explanation */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {result.explanation}
        </p>

        {/* Grade Gaps (if any) */}
        {result.gradeGaps.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded p-3 space-y-2">
            <p className="text-xs font-semibold text-amber-900">Grade Gaps:</p>
            <ul className="text-xs text-amber-800 space-y-1">
              {result.gradeGaps.map((gap, idx) => (
                <li key={idx}>
                  {gap.subject}: You have {gap.student}, but {gap.required} is required
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing Subjects (if any) */}
        {result.missingSubjects.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded p-3 space-y-2">
            <p className="text-xs font-semibold text-red-900">Missing Subjects:</p>
            <p className="text-xs text-red-800">{result.missingSubjects.join(', ')}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link href={`/program/${result.programId}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          {onCompareClick && (
            <Button
              variant="ghost"
              onClick={() => onCompareClick(result)}
              title="Add to comparison"
            >
              Compare
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
