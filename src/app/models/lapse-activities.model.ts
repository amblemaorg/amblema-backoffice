export interface Lapse {
    id: string;
    name: string;
    devName: string;
    isStandard: string;
    status: string;
}

export interface LapseActivity {
    lapse1: Lapse[];
    lapse2: Lapse[];
    lapse3: Lapse[];
}


export interface Activity {
    id?: string;
    name: string;
    hasText?: boolean;
    hasDate?: boolean;
    hasFile?: boolean;
    hasVideo?: boolean;
    hasChecklist?: boolean;
    hasUpload?: boolean;
    text?: string;
    file?: any;
    video?: Video[];
    checklist?: CheckList[];
    approvalType?: string;
    status: string;
}

export interface Video {
    id?: string;
    name?: string;
}

export interface CheckList {
    id?: string;
    name?: string;
}
