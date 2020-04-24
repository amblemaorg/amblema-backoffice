export interface Target {
    label: string;
    value: boolean;
}

export interface Level {
    target: Target[];
    week: string[];
    duration: string;
    techniques: string[];
    activities: string[];
    resources: string[];
    evaluations: string[];
    supportMaterial: string[];
}

export interface Topic {
    name: string;
    objectives: string[];
    strategies: string[];
    contents: string[];
    levels: Level[];
}

export interface Lapse {
    generalObjective: string;
    topics: Topic[];
}

export interface EnvironmentalProject {
    name: string;
    lapse1: Lapse;
    lapse2: Lapse;
    lapse3: Lapse;
}
