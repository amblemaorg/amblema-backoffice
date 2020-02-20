import { Slider } from './sldier.model';
import { Testimonial } from './testimonial.model';

export interface WebHome {
    slider: Slider[];
    aboutUsText: string;
    environmentText: string;
    readingText: string;
    mathText: string;
    testimonials: Testimonial[];
}

export interface HomePages {
    homePage: WebHome;
}
