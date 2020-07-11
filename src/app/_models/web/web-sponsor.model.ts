import { Testimonial } from './testimonial.model';

export interface SponsorPage {
    backgroundImage: string;
    testimonials: Testimonial[];
    steps: string[];
    sponsors: SponsorList[];
}

export interface WebSponsor {
    sponsorPage: SponsorPage;
}


export interface SponsorList {
    id: string;
    name: string;
    image: string;
    website: string;
    position: number;
}
