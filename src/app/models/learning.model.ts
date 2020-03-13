import { Slider } from './web/slider.model';

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
    name: string;
    title: string;
    description: string;
    priority: number;
    secondaryTitle: string;
    secondaryDescription: string;
    objectives: string[];
    slider: SliderMedia[];
    images: Slider[];
    duration: string;
    quizzes: Quizze[];
    createdAt?: string;
    updatedAt?: string;
}

/**
 * This is a custom slider
 */

export interface SliderMedia {
    url: string;
    description: string;
    type?: string;
}
