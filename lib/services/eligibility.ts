import { Program, EligibilityResult } from '@/lib/types/program';
import { StudentGrades, isGradeAtLeast } from '@/lib/types/student';

export function evaluateProgram(
  program: Program,
  studentGrades: StudentGrades
): EligibilityResult {
  const studentSubjects = Object.keys(studentGrades.subjects);
  const rulesChecked: Array<{ rule: string; status: 'pass' | 'fail'; reason: string }> = [];
  let passCount = 0;
  const missingSubjects: string[] = [];
  const gradeGaps: Array<{ subject: string; required: string; student: string }> = [];

  // Check each required subject
  for (const required of program.requiredSubjects) {
    const hasSubject = studentSubjects.includes(required.name);
    
    if (!hasSubject) {
      rulesChecked.push({
        rule: `Required: ${required.name}`,
        status: 'fail',
        reason: `${required.name} not provided in your grades`,
      });
      missingSubjects.push(required.name);
    } else {
      const studentGrade = studentGrades.subjects[required.name];
      const meetsMinimum = isGradeAtLeast(studentGrade, required.minimumGrade);
      
      if (meetsMinimum) {
        rulesChecked.push({
          rule: `Required: ${required.name} (min ${required.minimumGrade})`,
          status: 'pass',
          reason: `You achieved ${studentGrade}, which meets or exceeds ${required.minimumGrade}`,
        });
        passCount++;
      } else {
        rulesChecked.push({
          rule: `Required: ${required.name} (min ${required.minimumGrade})`,
          status: 'fail',
          reason: `You achieved ${studentGrade}, but ${required.minimumGrade} or better is required`,
        });
        gradeGaps.push({
          subject: required.name,
          required: required.minimumGrade,
          student: studentGrade,
        });
      }
    }
  }

  const totalRequired = program.requiredSubjects.length;
  const passPercentage = (passCount / totalRequired) * 100;

  // Determine eligibility status
  let eligibilityStatus: 'eligible' | 'close_match' | 'not_eligible';
  let confidenceLevel: 'high' | 'medium' | 'low';

  if (passPercentage === 100 && missingSubjects.length === 0 && gradeGaps.length === 0) {
    eligibilityStatus = 'eligible';
    confidenceLevel = 'high';
  } else if (passPercentage >= 75) {
    // Close match: missing some non-core or slightly below minimum
    eligibilityStatus = 'close_match';
    confidenceLevel = 'medium';
  } else {
    eligibilityStatus = 'not_eligible';
    confidenceLevel = 'low';
  }

  // Build explanation
  const explanation = buildExplanation(
    eligibilityStatus,
    program,
    passPercentage,
    gradeGaps,
    missingSubjects
  );

  return {
    programId: program.id,
    programName: program.programName,
    institutionName: program.institutionName,
    eligibilityStatus,
    matchScore: Math.round(passPercentage),
    confidenceLevel,
    rulesChecked,
    missingSubjects,
    gradeGaps,
    explanation,
  };
}

function buildExplanation(
  status: 'eligible' | 'close_match' | 'not_eligible',
  program: Program,
  passPercentage: number,
  gradeGaps: Array<{ subject: string; required: string; student: string }>,
  missingSubjects: string[]
): string {
  if (status === 'eligible') {
    return `Excellent! You meet all the requirements for ${program.programName} at ${program.institutionName}. We recommend contacting the admissions office to confirm application procedures and deadlines.`;
  } else if (status === 'close_match') {
    let explanation = `You are a close match for ${program.programName}. You meet ${Math.round(passPercentage)}% of the core requirements.`;
    
    if (gradeGaps.length > 0) {
      const gaps = gradeGaps.map((g) => `${g.subject} (you: ${g.student}, required: ${g.required})`).join(', ');
      explanation += ` However, the following grades are slightly below the minimum: ${gaps}.`;
    }
    
    if (missingSubjects.length > 0) {
      explanation += ` Missing subjects: ${missingSubjects.join(', ')}.`;
    }
    
    explanation += ` Consider contacting the admissions office to discuss your eligibility.`;
    return explanation;
  } else {
    let explanation = `Based on current requirements, you may not be eligible for ${program.programName} at ${program.institutionName}. You meet ${Math.round(passPercentage)}% of the core requirements.`;
    
    if (gradeGaps.length > 0) {
      const gaps = gradeGaps.map((g) => `${g.subject} (you: ${g.student}, required: ${g.required})`).join(', ');
      explanation += ` Grade gaps: ${gaps}.`;
    }
    
    if (missingSubjects.length > 0) {
      explanation += ` Missing subjects: ${missingSubjects.join(', ')}.`;
    }
    
    explanation += ` Consider exploring related programs or speaking with the institution about alternative pathways.`;
    return explanation;
  }
}

export function evaluateAllPrograms(
  programs: Program[],
  studentGrades: StudentGrades
): {
  allResults: EligibilityResult[];
  eligiblePrograms: EligibilityResult[];
  closeMatches: EligibilityResult[];
  notEligiblePrograms: EligibilityResult[];
} {
  const allResults = programs.map((program) => evaluateProgram(program, studentGrades));

  const eligiblePrograms = allResults.filter((r) => r.eligibilityStatus === 'eligible').sort((a, b) => b.matchScore - a.matchScore);
  const closeMatches = allResults.filter((r) => r.eligibilityStatus === 'close_match').sort((a, b) => b.matchScore - a.matchScore);
  const notEligiblePrograms = allResults.filter((r) => r.eligibilityStatus === 'not_eligible').sort((a, b) => b.matchScore - a.matchScore);

  return {
    allResults,
    eligiblePrograms,
    closeMatches,
    notEligiblePrograms,
  };
}
