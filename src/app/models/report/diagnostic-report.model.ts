interface DiagnosticReport {
    schoolYear: string;
    school: string;
    coordinator: string;
    date: string;
    yearSummaryAvailable: boolean;
    sections: Section[];
    yearSummary: YearSummary;
  }

interface YearSummary {
    reading: ReadingYearSummary;
    math: ReadingYearSummary;
    logic: ReadingYearSummary;
  }

interface ReadingYearSummary {
    totalResultAverage: number;
    improvementPercentageAverage: number;
    sections: SectionYearSummary[];
  }

interface SectionYearSummary {
    grade: string;
    name: string;
    goal: number;
    improvementPercentage: number;
    lapse1: Score;
    lapse2: Score;
    lapse3: Score;
  }

interface Section {
    grade: string;
    name: string;
    teacher: string;
    sectionSummaryAvailable: boolean;
    enrollment: number;
    lapse1: Lapse;
    lapse2: Lapse;
    lapse3: Lapse;
    sectionSummary: SectionSummary;
  }

interface SectionSummary {
    reading: Reading;
  }

interface Reading {
    totalIndexAverage: number;
    improvementPercentage: number;
    lapse1: Score;
    lapse2: Score;
    lapse3: Score;
  }

interface Score {
    overGoalStudents: number;
    resultAverage: number;
    indexAverage: number;
  }

interface Lapse {
    available: boolean;
    reading: Statistics;
    math: Statistics;
    logic: Statistics;
    students: Student[];
  }

interface Student {
    firstName: string;
    lastName: string;
    cardType: string;
    cardId: string;
    wordsPerMin: number;
    wordsPerMinIndex: number;
    multiplicationsPerMin: number;
    multiplicationsPerMinIndex: number;
    operationsPerMin: number;
    operationsPerMinIndex: number;
  }

interface Statistics {
    available: boolean;
    goal: number;
    participants: number;
    overGoalStudents: number;
    overGoalAverage: number;
    indexTotal: number;
    indexAverage: number;
    resultTotal: number;
    resultAverage: number;
    firstTestDate: string;
    lastTestDate: string;
  }
