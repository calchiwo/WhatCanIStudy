export interface StudentGrades {
  [subject: string]: string; // subject name -> grade (e.g., "Mathematics" -> "A1")
}

export interface RequiredSubject {
  name: string;
  minimumGrade: string; // e.g., "B3", "C4"
  isCore: boolean;
}

export interface OptionalSubject {
  name: string;
  benefitsDescription: string;
}

export interface Program {
  id: string;
  country: 'Ghana' | 'Nigeria';
  institutionName: string;
  programName: string;
  programType: 'engineering' | 'liberal-arts' | 'health-sciences' | 'business' | 'sciences' | 'education';
  duration: string; // e.g., "4 years"
  requiredSubjects: RequiredSubject[];
  optionalSubjects?: OptionalSubject[];
  minAggregate?: number;
  additionalCriteria?: string;
  typicalCareerPaths?: string[];
  eligibilityExplanationTemplate: string;
  dataStatus: 'sample' | 'verified' | 'outdated';
  notes?: string;
  lastUpdatedDate: string; // ISO date string
  sourceNote: string;
  websiteUrl?: string;
}

export interface EligibilityResult {
  programId: string;
  programName: string;
  institutionName: string;
  eligibilityStatus: 'eligible' | 'close_match' | 'not_eligible';
  matchScore: number; // 0-100
  confidenceLevel: 'high' | 'medium' | 'low';
  rulesChecked: Array<{
    rule: string;
    status: 'pass' | 'fail';
    reason: string;
  }>;
  missingSubjects: string[];
  gradeGaps: Array<{
    subject: string;
    required: string;
    student: string;
  }>;
  explanation: string;
}

export interface EligibilityCheckResult {
  country: 'Ghana' | 'Nigeria';
  studentGrades: StudentGrades;
  allResults: EligibilityResult[];
  eligiblePrograms: EligibilityResult[];
  closeMatches: EligibilityResult[];
  notEligiblePrograms: EligibilityResult[];
  timestamp: number;
}
