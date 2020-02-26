import { Image } from './media.model';

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
    slider: Slider[];
    images: Image[];
    duration: string;
    points: string;
    quizzes: Quizze[];
}

/**
 * This is a custom slider
 */

export interface Slider {
    url: string;
    description: string;
    type: string;
}