export interface File {
    name?: string;
    url?: string;
}

export interface Video {
    name?: string;
    url?: string;
}

export interface Checklist {
    id: string;
    name: string;
}

export interface LapseActivity {
    name: string;
    hasText?: string;
    hasDate?: string;
    hasFile?: string;
    hasVideo?: string;
    hasChecklist?: string;
    hasUpload?: string;
    text?: string;
    file?: File;
    video?: Video;
    checklist?: Checklist[];
    approvalType: string;
    status?: string;
}
