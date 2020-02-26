import { Slider } from './slider.model';

export interface Award {
    title: string;
    image: string;
    image2: 'str (url o base64)';
    description: string;
    description2: string;
}

export interface AboutUsPage {
    slider: Slider[];
    aboutUsText: string;
    environmentText: string;
    readingText: string;
    mathText: string;
    awards: Award[];
}

export interface WebAbout {
    aboutUsPage?: AboutUsPage;
}
