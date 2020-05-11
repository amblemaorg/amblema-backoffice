export interface GoalGrade {
    grade1: Grade;
    grade2: Grade;
    grade3: Grade;
    grade4: Grade;
    grade5: Grade;
    grade6: Grade;
} 
  
  interface Grade {
    multiplicationsPerMin: string;
    operationsPerMin: string;
    wordsPerMin: string;
  }