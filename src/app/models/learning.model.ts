import { Image, Video } from './media.model';

export interface Quizze {
    id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
}

export interface Learning {
    id?: string;
    title: string;
    description: string;
    secondaryTitle: string;
    secondaryDescription: string;
    objetives: string[];
    images: Image[];
    videos: Video[];
    duration: string;
    points: string;
    quizzes: Quizze[];
}
