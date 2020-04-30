export interface Reading {
    available: boolean;
    goal: number;
    participants: number;
    overGoalStudents: number;
    overGoalAverage: number;
    indexTotal: number;
    indexAverage: number;
    resultTotal: number;
    resultAverage: number;
    firstTestDate: Date;
    lastTestDate: Date;
}

export interface Math {
    available: boolean;
    goal: number;
    participants: number;
    overGoalStudents: number;
    overGoalAverage: number;
    indexTotal: number;
    indexAverage: number;
    resultTotal: number;
    resultAverage: number;
    firstTestDate: Date;
    lastTestDate: Date;
}

export interface Logic {
    available: boolean;
    goal: number;
    participants: number;
    overGoalStudents: number;
    overGoalAverage: number;
    indexTotal: number;
    indexAverage: number;
    resultTotal: number;
    resultAverage: number;
    firstTestDate: Date;
    lastTestDate: Date;
}

export interface Student {
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



declare module namespace {

    export interface Reading {
        available: string;
        goal: string;
        participants: string;
        overGoalStudents: string;
        overGoalAverage: string;
        indexTotal: string;
        indexAverage: string;
        resultTotal: string;
        resultAverage: string;
        firstTestDate: Date;
        lastTestDate: Date;
    }

    export interface Math {
        available: string;
        goal: string;
        participants: string;
        overGoalStudents: string;
        overGoalAverage: string;
        indexTotal: string;
        indexAverage: string;
        resultTotal: string;
        resultAverage: string;
        firstTestDate: Date;
        lastTestDate: Date;
    }

    export interface Logic {
        available: string;
        goal: string;
        participants: string;
        overGoalStudents: string;
        overGoalAverage: string;
        indexTotal: string;
        indexAverage: string;
        resultTotal: string;
        resultAverage: string;
        firstTestDate: Date;
        lastTestDate: Date;
    }

    export interface Student {
        firstName: string;
        lastName: string;
        cardType: string;
        cardId: string;
        wordsPerMin: string;
        wordsPerMinIndex: string;
        multiplicationsPerMin: string;
        multiplicationsPerMinIndex: string;
        operationsPerMin: string;
        operationsPerMinIndex: string;
    }

    export interface Lapse1 {
        available: string;
        reading: Reading;
        math: Math;
        logic: Logic;
        students: Student[];
    }

    export interface Lapse12 {
        overGoalStudents: string;
        resultAverage: string;
        indexAverage: string;
    }

    export interface Lapse2 {
        overGoalStudents: string;
        resultAverage: string;
        indexAverage: string;
    }

    export interface Lapse3 {
        overGoalStudents: string;
        resultAverage: string;
        indexAverage: string;
    }

    export interface Reading2 {
        totalIndexAverage: string;
        improvementPercentage: string;
        lapse1: Lapse12;
        lapse2: Lapse2;
        lapse3: Lapse3;
    }

    export interface SectionSummary {
        reading: Reading2;
    }

    export interface Section {
        grade: string;
        name: string;
        teacher: string;
        sectionSummaryAvailable: string;
        enrollment: string;
        lapse1: Lapse1;
        sectionSummary: SectionSummary;
    }

    export interface RootObject {
        sections: Section[];
    }

}

