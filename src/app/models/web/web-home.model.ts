export interface Slider {
    id?: number;
    image: string;
    description: string;
}

export interface Testimonial {
    firstName: string;
    lastName: string;
    image: string;
    function: string;
    description: string;
}

export interface WebHome {
    slider: Slider[];
    aboutUsText: string;
    environmentText: string;
    readingText: string;
    mathText: string;
    testimonials: Testimonial[];
}
