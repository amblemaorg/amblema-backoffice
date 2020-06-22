import { Testimonial } from './testimonial.model';

export interface CoordinatorPage {
    backgroundImage: string;
    testimonials: Testimonial[];
    steps: string[];
}

export interface WebCoordinator {
    coordinatorPage: CoordinatorPage;
}
