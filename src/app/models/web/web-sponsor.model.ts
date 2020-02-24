import { Testimonial } from './testimonial.model';

export interface SponsorPage {
    backgroundImage: string;
    testimonials: Testimonial[];
    steps: string[];
}

export interface WebSponsor {
    sponsorPage: SponsorPage;
}