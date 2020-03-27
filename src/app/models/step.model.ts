export interface Step {
    id?: '';
    name: string;
    devName?: string;
    tag: string;

    // Check fields --
    hasText?: boolean;
    hasDate?: boolean;
    hasFile?: boolean;
    hasVideo?: boolean;
    hasChecklist?: boolean;
    hasUpload?: boolean;
    // ----------------

    // ----------------
    text?: string;
    file?: string;
    video?: string;
    checklist?: ItemCheck[];
    // ----------------
    
    approvalType: string;
    isStandard?: string;
    status: string;
}

export interface ItemCheck {
    id?: string;
    name?: string;
}