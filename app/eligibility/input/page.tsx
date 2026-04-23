'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { FormStepCard } from '@/components/forms/FormStepCard';
import { DataWarning } from '@/components/shared/DataWarning';
import { WASSCE_SUBJECTS, GRADE_OPTIONS, STUDY_AREAS, INSTITUTION_TYPES } from '@/lib/data/subjects';
import { X, Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enter Your Grades - WhatCanIStudy',
  description: 'Enter your WASSCE grades to check your eligibility for Ghanaian university programs. Quick, simple, and free.',
  keywords: 'WASSCE grades, university eligibility check, program requirements',
};

export default function GradeInputPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [examType, setExamType] = useState('wassce');
  const [studyArea, setStudyArea] = useState('');
  const [institutionType, setInstitutionType] = useState('any');
  const [grades, setGrades] = useState<{ subject: string; grade: string }[]>([
    { subject: '', grade: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddSubject = () => {
    setGrades([...grades, { subject: '', grade: '' }]);
  };

  const handleRemoveSubject = (index: number) => {
    setGrades(grades.filter((_, i) => i !== index));
  };

  const handleSubjectChange = (index: number, value: string) => {
    const newGrades = [...grades];
    newGrades[index].subject = value;
    setGrades(newGrades);
  };

  const handleGradeChange = (index: number, value: string) => {
    const newGrades = [...grades];
    newGrades[index].grade = value;
    setGrades(newGrades);
  };

  const validateStep = () => {
    if (currentStep === 1 && !examType) {
      setError('Please select an exam type');
      return false;
    }
    if (currentStep === 2 && !studyArea) {
      setError('Please select a study area');
      return false;
    }
    if (currentStep === 3) {
      // Validate grades
      const emptyGrades = grades.filter((g) => !g.subject || !g.grade);
      if (emptyGrades.length > 0) {
        setError('Please fill in all subject grades');
        return false;
      }
      // Check for duplicates
      const subjects = grades.map((g) => g.subject);
      if (new Set(subjects).size !== subjects.length) {
        setError('You cannot select the same subject twice');
        return false;
      }
      if (grades.length === 0) {
        setError('Please enter at least one subject grade');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      // Store the form data in session storage for the results page
      const formData = {
        subjects: Object.fromEntries(grades.map((g) => [g.subject, g.grade])),
        examType,
        intendedStudyArea: studyArea,
        preferredInstitutionType: institutionType,
      };

      sessionStorage.setItem('studentGrades', JSON.stringify(formData));
      router.push('/eligibility/results');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <DataWarning
        variant="warning"
        title="Sample Data"
        message="This app uses sample program data for demonstration. Verify with institutions before applying."
      />

      {currentStep === 1 && (
        <FormStepCard stepNumber={1} totalSteps={4} title="Exam Type" description="What exam did you take?">
          <div className="space-y-3">
            <Label htmlFor="exam-type">Exam Type</Label>
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger id="exam-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wassce">WASSCE (West African Senior School Certificate Examination)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </FormStepCard>
      )}

      {currentStep === 2 && (
        <FormStepCard
          stepNumber={2}
          totalSteps={4}
          title="Study Area"
          description="What do you want to study? (Optional but helpful)"
        >
          <div className="space-y-3">
            <Label htmlFor="study-area">Intended Study Area</Label>
            <Select value={studyArea} onValueChange={setStudyArea}>
              <SelectTrigger id="study-area">
                <SelectValue placeholder="Select a study area..." />
              </SelectTrigger>
              <SelectContent>
                {STUDY_AREAS.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormStepCard>
      )}

      {currentStep === 3 && (
        <FormStepCard
          stepNumber={3}
          totalSteps={4}
          title="Your Grades"
          description="Enter all the subjects and grades from your exam"
        >
          <div className="space-y-4">
            {grades.map((gradeEntry, index) => (
              <Card key={index} className="p-4 space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`subject-${index}`}>Subject</Label>
                    <Select value={gradeEntry.subject} onValueChange={(value) => handleSubjectChange(index, value)}>
                      <SelectTrigger id={`subject-${index}`}>
                        <SelectValue placeholder="Select subject..." />
                      </SelectTrigger>
                      <SelectContent>
                        {WASSCE_SUBJECTS.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`grade-${index}`}>Grade</Label>
                    <Select value={gradeEntry.grade} onValueChange={(value) => handleGradeChange(index, value)}>
                      <SelectTrigger id={`grade-${index}`}>
                        <SelectValue placeholder="Select grade..." />
                      </SelectTrigger>
                      <SelectContent>
                        {GRADE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {grades.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveSubject(index)}
                    className="w-full"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove Subject
                  </Button>
                )}
              </Card>
            ))}

            <Button onClick={handleAddSubject} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Subject
            </Button>
          </div>
        </FormStepCard>
      )}

      {currentStep === 4 && (
        <FormStepCard
          stepNumber={4}
          totalSteps={4}
          title="Review & Submit"
          description="Review your information before checking eligibility"
        >
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="border-l-4 border-blue-600 pl-4 py-2">
                <p className="text-sm text-muted-foreground">Exam Type</p>
                <p className="font-semibold text-foreground">{examType === 'wassce' ? 'WASSCE' : 'Other'}</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4 py-2">
                <p className="text-sm text-muted-foreground">Study Area</p>
                <p className="font-semibold text-foreground">{studyArea || 'Not specified'}</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4 py-2">
                <p className="text-sm text-muted-foreground">Subjects & Grades</p>
                <ul className="space-y-1 mt-2">
                  {grades.map((g, idx) => (
                    <li key={idx} className="text-sm text-foreground">
                      {g.subject}: <strong>{g.grade}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              By clicking Submit, you understand this is sample data for demonstration. Always verify eligibility with institutions.
            </p>
          </div>
        </FormStepCard>
      )}

      {/* Error Display */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-sm text-red-800">{error}</p>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 justify-between">
        {currentStep > 1 && (
          <Button variant="outline" onClick={handleBack} disabled={loading}>
            Back
          </Button>
        )}
        <div className="flex gap-2 ml-auto">
          {currentStep < 4 && (
            <Button onClick={handleNext} disabled={loading}>
              Next
            </Button>
          )}
          {currentStep === 4 && (
            <Button onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? 'Checking Eligibility...' : 'Check Eligibility'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
