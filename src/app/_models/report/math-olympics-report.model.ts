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
    classifiedStudentsNational: number;
    studentsGoldMedalNational: number;
    studentsSilverMedalNational: number;
    studentsBronzeMedalNational: number;
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
    totalClassifiedNational: number;
    totalGoldMedalsNational: number;
    totalSilverMedalsNational: number;
    totalBronzeMedalsNational: number;
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
    classifiedNational: number;
    medalsGoldNational: number;
    medalsSilverNational: number;
    medalsBronzeNational: number;
}

interface Meta {
    name: string;
    coordinator: string;
    sponsor: string;
}
