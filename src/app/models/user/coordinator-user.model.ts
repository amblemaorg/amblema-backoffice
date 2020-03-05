import { User } from './user.model';

export interface Sponsor {
    id: string;
    name: string;
}

export interface School {
    id: string;
    name: string;
}

export interface Project {
    id: string;
    code: string;
    sponsor: Sponsor;
    school: School;
}

export interface Answer {
    quizId: string;
    option: string;
}

export interface Attempt {
    status: string;
    createdAt: string;
    answers: Answer[];
}

export interface Learning {
    moduleId: string;
    score: string;
    status: string;
    attempts: Attempt[];
}

export interface CoordinatorUser extends User {
    firstName: string;
    lastName: string;
    cardType: string;
    cardId: string;
    birthdate: string;
    homePhone: string;
    addressHome: string;
    projects?: Project[];
    learning?: Learning[];
    nCoins?: string;
    status: string;
}
