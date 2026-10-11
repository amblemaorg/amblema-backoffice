import { Slider } from './slider.model';
import { Testimonial } from './testimonial.model';

export interface WebHome {
    slider: Slider[];
    aboutUsText: string;
    environmentText: string;
    readingText: string;
    mathText: string;
    aulaActivaText?: string;
    testimonials: Testimonial[];
}

export interface HomePages {
    homePage: WebHome;
}
