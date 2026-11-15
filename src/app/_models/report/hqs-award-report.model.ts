export type HqsAwardCode = 'gold' | 'silver' | 'bronze';
export type HqsAwardStatus = 'awarded' | 'none' | 'incomplete';
export type HqsComponentKey =
  | 'iaa'
  | 'wordsPerMin'
  | 'multiplicationsPerMin'
  | 'operationsPerMin';

export interface HqsAwardLevel {
  code: HqsAwardCode;
  label: string;
  minPercentage: number;
}

export interface HqsAwardSchool {
  schoolId: string;
  name: string;
  pecaId: string;
  coordinator: string | null;
  iaaRaw: number | null;
  components: { [key in HqsComponentKey]: number | null };
  integralIndex: number | null;
  teacherIndex: number | null;
  nCompletedCoevaluations: number;
  finalIndex: number | null;
  missing: string[];
  missingLabels: string[];
  status: HqsAwardStatus;
  award: HqsAwardCode | null;
  awardLabel: string;
}

export interface HqsAwardReport {
  schoolYear: { id: string; name: string; status: string };
  levels: HqsAwardLevel[];
  counts: {
    gold: number;
    silver: number;
    bronze: number;
    none: number;
    incomplete: number;
  };
  schools: HqsAwardSchool[];
}
