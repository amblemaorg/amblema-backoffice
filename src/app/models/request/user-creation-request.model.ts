export interface UserCreationRequest {
    id: string;
    requestCode: string;
    projectCode: string;
    type: string;
    user: string;
    createdAt: string;
    record: string;

    /* Get more data from the user request */
}
