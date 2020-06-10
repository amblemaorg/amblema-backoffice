export interface OlympicsReport {
    allPeriods: AllPeriod[];
    finalScore: FinalScore;
}

interface FinalScore {
    enrolledStudents: number;
    classifiedStudents: number;
    studentsGoldMedal: number;
    studentsSilverMedal: number;
    studentsBronzeMedal: number;
}

interface AllPeriod {
    academicPeriod: string[];
    schools: School[];
}

interface School {
    meta: Meta;
    grades: Grade[];
    total: Total;
}

interface Total {
    totalEnrolled: number;
    totalClassified: number;
    totalGoldMedals: number;
    totalSilverMedals: number;
    totalBronzeMedals: number;
}

interface Grade {
    name: string;
    sections: Section[];
}

interface Section {
    name: string;
    inscribed: number;
    classified: number;
    medalsGold: number;
    medalsSilver: number;
    medalsBronze: number;
}

interface Meta {
    name: string;
    coordinator: string;
    sponsor: string;
}
