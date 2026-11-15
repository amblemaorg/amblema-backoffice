// Contrato de GET statistics/coevaluationsreport/<schoolYearId>?schoolId=&level=
// (amblema---backend: TeacherCoevaluationService.report)

export type CoevaluationLevelCode =
  | 'excellence'
  | 'commitment'
  | 'progress'
  | 'beginning';

export type CoevaluationStatus =
  | 'not_started'
  | 'pending_teacher'
  | 'pending_coordinator'
  | 'completed';

export interface CoevaluationInstrumentItem {
  number: number;
  dimension: string;
  title: string;
  question: string;
}

export interface CoevaluationLevel {
  code: CoevaluationLevelCode;
  label: string;
  minTotal: number;
  minPercentage: number;
}

export interface CoevaluationInstrument {
  version: number;
  minScore: number;
  maxScore: number;
  maxTotal: number;
  dimensions: { code: string; name: string }[];
  items: CoevaluationInstrumentItem[];
  scale: { score: number; label: string; description: string }[];
  levels: CoevaluationLevel[];
}

export interface CoevaluationItemResult {
  number: number;
  teacher: number | null;
  coordinator: number | null;
  average: number | null;
}

export interface CoevaluationSchoolInfo {
  schoolId: string;
  name: string;
  code: string;
  pecaId: string;
  coordinator: string | null;
}

export interface CoevaluationTeacherRow {
  teacherId: string;
  firstName: string;
  lastName: string;
  cardType: string;
  cardId: string;
  email: string;
  phone: string;
  sections: string;
  coordinator: string | null;
  coordinatorSubmittedAt: string | null;
  teacherSubmittedAt: string | null;
  items: CoevaluationItemResult[];
  status: CoevaluationStatus;
  statusLabel: string;
  totalScore: number | null;
  percentage: number | null;
  level: CoevaluationLevelCode | null;
  levelLabel: string | null;
  // Solo en byLevel
  school?: CoevaluationSchoolInfo;
}

export interface CoevaluationSchoolSummary extends CoevaluationSchoolInfo {
  nTeachers: number;
  nCompleted: number;
  index: number | null;
  indexLevel: CoevaluationLevelCode | null;
  indexLevelLabel: string | null;
  levelCounts: { [code in CoevaluationLevelCode]: number };
  statusCounts: { [code in CoevaluationStatus]: number };
  teachers: CoevaluationTeacherRow[];
}

export interface CoevaluationLevelGroup {
  code: CoevaluationLevelCode;
  label: string;
  count: number;
  teachers: CoevaluationTeacherRow[];
}

export interface CoevaluationReport {
  schoolYear: { id: string; name: string; status: string };
  instrument: CoevaluationInstrument;
  statusLabels: { [code in CoevaluationStatus]: string };
  bySchool: CoevaluationSchoolSummary[];
  byLevel: CoevaluationLevelGroup[];
}
