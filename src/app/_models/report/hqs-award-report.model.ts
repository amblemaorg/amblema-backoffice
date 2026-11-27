/** Qué se exporta: lo filtrado en pantalla, todas las escuelas, o todas agrupadas por estado. */
export type HqsExportScope = 'filters' | 'general' | 'byState';

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
  coordinatorIndex: number | null;
  finalIndex: number | null;
  missing: string[];
  missingLabels: string[];
  status: HqsAwardStatus;
  award: HqsAwardCode | null;
  awardLabel: string;
  yearbookDownloadEnabled: boolean;
  state: { id: string; name: string } | null;
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
