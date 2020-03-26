
export interface ApprovalHistory {
    id: string;
    comments: string;
    status: string;
}

export interface Step {
    id: string;
    name: string;
    devName: string;
    tag: string;
    hasText: string;
    hasDate: string;
    hasFile: string;
    hasVideo: string;
    hasChecklist: string;
    hasUpload: string;
    text: string;
    file: string;
    video: string;
    checklist: string;
    approvalType: string;
    isStandard: string;
    status: string;
    approvalHistory: ApprovalHistory[];
}

export interface StepsProgress {
    general: string;
    school: string;
    sponsor: string;
    coordinator: string;
    steps: Step[];
}

export interface Project {
    id?: string;
    title: string;
    phase?: string;
    school: string;
    sponsor: string;
    coordinator: string;
    stepsProgress?: StepsProgress;
}

