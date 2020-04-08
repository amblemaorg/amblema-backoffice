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
