import { User } from './user.model';

export interface Coordinator {
    id: string;
    name: string;
}

export interface School {
    id: string;
    name: string;
}

export interface Project {
    id: string;
    code: string;
    coordinator: Coordinator;
    school: School;
}

export interface SponsorUser extends User {
    firstName: string;
    lastName: string;
    cardType: string;
    cardId: string;
    companyRIF: string;
    companyType: string;
    companyOtherType: string;
    companyPhone: string;
    contactFirstName: string;
    contactLastName: string;
    contactPhone: string;
    image: string;
    webSite: string;
    projects?: Project[]; // <-- No need in the form s
    status: string;
}
