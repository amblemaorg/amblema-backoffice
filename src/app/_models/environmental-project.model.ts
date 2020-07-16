export interface Target {
    label: string;
    value: boolean;
}

export interface Level {
    index?: number;
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
    index?: number;
    name: string;
    objectives: string[];
    strategies: string[];
    contents: string[];
    levels?: Level[];
}

export interface Lapse {
    generalObjective: string;
    
    topics: Topic[];
}

export interface EnvironmentalProject {
    name: string;
    description?: string;
    lapse1: Lapse;
    lapse2: Lapse;
    lapse3: Lapse;
}
