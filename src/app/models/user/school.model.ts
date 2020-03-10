import { User } from './user.model';

export interface SchoolUser extends User {
    code: string;
    name: string;
    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
    contactFunction: string;

    principalFirstName: string;
    principalLastName: string;
    principalEmail: string;
    principalPhone: string;

    // No required ---
    image: string;
    schoolType: string;
    subPrincipalFirstName: string;
    subPrincipalLastName: string;
    subPrincipalEmail: string;
    subPrincipalPhone: string;

    nTeachers: string;
    nAdministrativeStaff: string;
    nLaborStaff: string;
    nStudents: string;
    nGrades: string;
    nSections: string;
    schoolShift: string;
    // ----------------

    status: string;
}