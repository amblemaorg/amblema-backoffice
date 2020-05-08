import { Inject } from '@angular/core';
import { DOCUMENT, DatePipe } from '@angular/common';

export class PDFReportMath {

    constructor(@Inject( DOCUMENT ) private document: any, private datePipe: DatePipe,) {}

    async generateMathOlympics() { }
}