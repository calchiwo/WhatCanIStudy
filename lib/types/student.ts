export interface StudentGrades {
  subjects: {
    [subjectName: string]: string; // grade like "A1", "B2", etc.
  };
  examType: 'wassce' | 'other';
  intendedStudyArea?: string;
  preferredInstitutionType?: 'public' | 'private' | 'any';
  locationPreference?: string;
  budgetPreference?: 'low' | 'medium' | 'high';
}

export const GRADE_SCALE: Record<string, number> = {
  'A1': 1,
  'A2': 2,
  'B2': 2,
  'B3': 3,
  'C4': 4,
  'C5': 5,
  'C6': 6,
  'D7': 7,
  'D8': 8,
  'E8': 8,
  'E9': 9,
  'F9': 9,
};

// Numeric lower is better (A1 = 1 is best, F9 = 9 is worst)
export function compareGrades(grade1: string, grade2: string): number {
  const g1Value = GRADE_SCALE[grade1] ?? 10;
  const g2Value = GRADE_SCALE[grade2] ?? 10;
  return g1Value - g2Value; // negative if g1 is better, positive if g2 is better
}

export function isGradeAtLeast(studentGrade: string, requiredGrade: string): boolean {
  return compareGrades(studentGrade, requiredGrade) <= 0;
}
