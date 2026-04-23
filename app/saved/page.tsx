'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/EmptyState';
import { DataWarning } from '@/components/shared/DataWarning';
import { Trash2, RotateCcw, Calendar } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Saved Results: WhatCanIStudy',
  description: 'View your saved eligibility checks and results history.',
  keywords: 'saved results, eligibility history, program checks',
};

interface SavedCheck {
  timestamp: number;
  studentGrades?: {
    subjects: Record<string, string>;
    examType: string;
    intendedStudyArea?: string;
  };
  eligible?: number;
  close?: number;
  notEligible?: number;
}

export default function SavedResultsPage() {
  const [checks, setChecks] = useState<SavedCheck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('eligibilityChecks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setChecks(parsed);
      } catch (err) {
        console.error('Error loading saved checks:', err);
      }
    }
    setLoading(false);
  }, []);

  const handleDelete = (timestamp: number) => {
    const updated = checks.filter((c) => c.timestamp !== timestamp);
    setChecks(updated);
    localStorage.setItem('eligibilityChecks', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all saved results?')) {
      setChecks([]);
      localStorage.removeItem('eligibilityChecks');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <EmptyState title="Loading..." description="Retrieving your saved results..." />;
  }

  if (checks.length === 0) {
    return (
      <div className="space-y-6">
        <DataWarning
          variant="info"
          title="No Saved Results"
          message="You haven't saved any eligibility checks yet. Start a new check to save your results."
        />
        <EmptyState
          icon={<Calendar className="h-12 w-12 text-muted-foreground" />}
          title="No Saved Results"
          description="Your eligibility checks will appear here when you save them."
          ctaText="Start a New Check"
          ctaHref="/eligibility/input"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DataWarning
        variant="info"
        title="Saved Results"
        message="Your eligibility checks are stored locally on this device. They won't sync across devices."
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Saved Results</h1>
          <p className="text-muted-foreground mt-2">{checks.length} saved check{checks.length !== 1 ? 's' : ''}</p>
        </div>
        <Button
          onClick={handleClearAll}
          variant="destructive"
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {checks.map((check, idx) => (
          <Card key={`${check.timestamp}-${idx}`} className="p-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              {/* Top row: Date and stats */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(check.timestamp)}
                  </p>
                  {check.studentGrades && (
                    <p className="text-sm text-foreground mt-2">
                      Study Area: <strong>{check.studentGrades.intendedStudyArea || 'Not specified'}</strong>
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  {check.eligible !== undefined && (
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{check.eligible}</p>
                      <p className="text-xs text-muted-foreground">Eligible</p>
                    </div>
                  )}
                  {check.close !== undefined && (
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-600">{check.close}</p>
                      <p className="text-xs text-muted-foreground">Close</p>
                    </div>
                  )}
                  {check.notEligible !== undefined && (
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{check.notEligible}</p>
                      <p className="text-xs text-muted-foreground">Not Eligible</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Subjects (if available) */}
              {check.studentGrades && check.studentGrades.subjects && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-semibold text-foreground mb-2">Subjects & Grades</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(check.studentGrades.subjects).map(([subject, grade]) => (
                      <span
                        key={subject}
                        className="text-xs bg-blue-50 border border-blue-200 text-foreground px-2 py-1 rounded"
                      >
                        {subject}: <strong>{grade}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (check.studentGrades) {
                      const formData = {
                        subjects: check.studentGrades.subjects,
                        examType: check.studentGrades.examType || 'wassce',
                        intendedStudyArea: check.studentGrades.intendedStudyArea,
                      };
                      sessionStorage.setItem('studentGrades', JSON.stringify(formData));
                      window.location.href = '/eligibility/results';
                    }
                  }}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  View Results
                </Button>
                <Button
                  onClick={() => handleDelete(check.timestamp)}
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action */}
      <div className="flex gap-2 flex-wrap">
        <Link href="/eligibility/input">
          <Button className="bg-blue-600 hover:bg-blue-700">
            New Eligibility Check
          </Button>
        </Link>
      </div>
    </div>
  );
}
