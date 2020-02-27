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
    title: string;
    description: string;
    secondaryTitle: string;
    secondaryDescription: string;
    objectives: string[];
    slider: SliderMedia[];
    images: Slider[];
    duration: string;
    points: string;
    quizzes: Quizze[];
}

/**
 * This is a custom slider
 */

export interface SliderMedia {
    url: string;
    description: string;
    type?: string;
}
