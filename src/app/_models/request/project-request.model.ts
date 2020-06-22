export interface ProjectRequest {
    id: string;
    requestCode: string;
    type: string;
    name: string;
    createdAt: string;
    /* From here more data is shown according to the type of applicant */

    status: string;
}
