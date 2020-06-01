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
    video?: any;
    checklist?: ItemCheck[];
    // ----------------

    approvalType: string;
    isStandard?: boolean;
    status: string;
}

export interface ItemCheck {
    id?: string;
    name?: string;
}


export const TAG_STEP = {
    GENEAL: {
        CODE: '1',
        VALUE: 'General',
    },
    COORDINATOR: {
        CODE: '2',
        VALUE: 'Coordinador'
    },
    SPONSOR: {
        CODE: '3',
        VALUE: 'Padrino'
    },
    SCHOOL: {
        CODE: '4',
        VALUE: 'Escuela'
    }
};

export const APPROVAL_TYPE = [
    {
        CODE: '1',
        VALUE: 'Lo aprueba el administrador',
    },
    {
        CODE: '3',
        VALUE: 'Generar solicitud de aprobación'
    },
    {
        CODE: '4',
        VALUE: 'Aprobación por estatus interno'
    }
];
