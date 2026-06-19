import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { DatePipe, formatDate } from "@angular/common";
import { DiagnosticReportService } from "src/app/services/report/diagnostic-report.service";
import { PDFReport } from "../pdf-report.service";
import { Select } from "@ngxs/store";
import { SchoolYearEnrolledState } from "src/app/store/_enrolled/school-year-enrolled.action";
import { SchoolUserState } from "src/app/store/user/school-user.action";
import { SchoolUser } from "src/app/_models/user/school.model";
import { SchoolYearEnrolled } from "src/app/_models/_enrolled/school-year.model";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx-js-style";

import { Store } from "@ngxs/store";
import { GetSchoolYearsEnrolled } from "src/app/store/_enrolled/school-year-enrolled.action";
import { GetSchoolUsers } from "src/app/store/user/school-user.action";

@Component({
  selector: "app-diagnostic-report",
  templateUrl: "./diagnostic-report.component.html",
  styleUrls: ["./diagnostic-report.component.scss"],
  providers: [DatePipe, PDFReport],
})
export class DiagnosticReportComponent implements OnInit, OnDestroy {
  @Select(SchoolYearEnrolledState.schoolYearsEnrolled)
  data$: Observable<SchoolYearEnrolled[]>;
  @Select(SchoolUserState.schoolUsers)
  schools$: Observable<SchoolUser[]>;

  disabledBtn = false;
  subscriptionService: Subscription;

  // -- School --
  selectedSchool;

  // -- Setting checks --
  diagnostics = [
    { label: "Matemática", value: false },
    { label: "Lectura", value: false },
    { label: "Lógica", value: false },
  ];

  // -- School Year --
  selectedSchoolYears;

  // -- Report Type --
  reportType: string = 'diagnostics';

  constructor(
    private cd: ChangeDetectorRef,
    private generatorReport: PDFReport,
    private diagnosticsReportService: DiagnosticReportService,
    private toastr: CustomToastrService,
    private store: Store
  ) {}

  async ngOnInit() {
    this.store.dispatch(new GetSchoolUsers());
    this.store.dispatch(new GetSchoolYearsEnrolled());
  }

  ngOnDestroy(): void {
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
  }

  onGenerateReport() {
    this.disabledBtn = true;

    this.subscriptionService = this.diagnosticsReportService
      .getReport(
        this.selectedSchoolYears.id,
        this.selectedSchool.id,
        this.diagnostics
      )
      .subscribe(
        (response: any) => {
          if (response.sections.length) {
            this.generatorReport.onGenerate(response);
          } else {
            this.toastr.info("Información", "No se encontraron registros");
          }

          setTimeout(() => {
            this.disabledBtn = false;
            this.cd.detectChanges();
          }, 3500);
        },
        (err: any) => {
          if (err.status === 404) {
            this.toastr.info("Información", "No se encontraron registros");
          }

          this.disabledBtn = false;
          this.cd.detectChanges();
        }
      );
  }

  onGeneratePinsReport(format: 'pdf' | 'xls') {
    this.disabledBtn = true;

    this.subscriptionService = this.diagnosticsReportService
      .getPinsReport(this.selectedSchoolYears.id)
      .subscribe(
        (response: any) => {
          if (response.schools && response.schools.length) {
            response.schools.sort((a, b) => {
              const stateA = (a.state || '').toLowerCase();
              const stateB = (b.state || '').toLowerCase();
              if (stateA !== stateB) {
                return stateA.localeCompare(stateB);
              }
              const nameA = (a.schoolName || '').toLowerCase();
              const nameB = (b.schoolName || '').toLowerCase();
              return nameA.localeCompare(nameB);
            });

            if (format === 'pdf') {
              this.generatorReport.generatePinsReport(response);
            } else if (format === 'xls') {
              const htmlContent = this.makePinsExcel(response);
              
              const parser = new DOMParser();
              const doc = parser.parseFromString(htmlContent, "text/html");
              const table = doc.querySelector("table");
              const workbook = XLSX.utils.table_to_book(table);
              
              const sheet = workbook.Sheets[workbook.SheetNames[0]];
              const range = XLSX.utils.decode_range(sheet['!ref']);

              const thinBorder = {
                top: { style: "thin", color: { rgb: "CCCCCC" } },
                bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                left: { style: "thin", color: { rgb: "CCCCCC" } },
                right: { style: "thin", color: { rgb: "CCCCCC" } }
              };

              const titleStyle = {
                font: { name: "Arial", sz: 16, bold: true, color: { rgb: "2E8AAA" } },
                alignment: { horizontal: "center", vertical: "center" }
              };

              const periodLabelStyle = {
                font: { name: "Arial", sz: 10, bold: true },
                alignment: { horizontal: "left" }
              };

              const periodValueStyle = {
                font: { name: "Arial", sz: 10 },
                alignment: { horizontal: "left" }
              };

              const headerGreenStyle = {
                font: { name: "Arial", sz: 11, bold: true, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "81B03E" } },
                alignment: { horizontal: "center", vertical: "center" },
                border: thinBorder
              };

              const headerBlueStyle = {
                font: { name: "Arial", sz: 11, bold: true, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "00809A" } },
                alignment: { horizontal: "center", vertical: "center" },
                border: thinBorder
              };

              const stateTotalStyleLeft = {
                font: { name: "Arial", sz: 11, bold: true },
                fill: { fgColor: { rgb: "F9F9F9" } },
                alignment: { horizontal: "left", vertical: "center" },
                border: thinBorder
              };

              const stateTotalStyleCenter = {
                font: { name: "Arial", sz: 11, bold: true },
                fill: { fgColor: { rgb: "F9F9F9" } },
                alignment: { horizontal: "center", vertical: "center" },
                border: thinBorder
              };

              const generalTotalStyleLeft = {
                font: { name: "Arial", sz: 11, bold: true },
                fill: { fgColor: { rgb: "F5F5F5" } },
                alignment: { horizontal: "left", vertical: "center" },
                border: thinBorder
              };

              const generalTotalStyleCenter = {
                font: { name: "Arial", sz: 11, bold: true },
                fill: { fgColor: { rgb: "F5F5F5" } },
                alignment: { horizontal: "center", vertical: "center" },
                border: thinBorder
              };

              const dataStyleLeft = {
                font: { name: "Arial", sz: 10 },
                alignment: { horizontal: "left", vertical: "center" },
                border: thinBorder
              };

              const dataStyleCenter = {
                font: { name: "Arial", sz: 10 },
                alignment: { horizontal: "center", vertical: "center" },
                border: thinBorder
              };

              for (let R = range.s.r; R <= range.e.r; ++R) {
                let isStateTotal = false;
                let isGeneralTotal = false;

                const cellCol0 = sheet[XLSX.utils.encode_cell({ r: R, c: 0 })];
                const valCol0 = cellCol0 ? String(cellCol0.v) : "";
                if (valCol0.startsWith("Total ") && R >= 5) {
                  isStateTotal = true;
                } else if (valCol0 === "Total general" && R >= 5) {
                  isGeneralTotal = true;
                }

                for (let C = range.s.c; C <= range.e.c; ++C) {
                  const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
                  let cell = sheet[cell_address];
                  if (!cell) {
                    cell = { t: "s", v: "" };
                    sheet[cell_address] = cell;
                  }

                  if (R === 0) {
                    cell.s = titleStyle;
                  } else if (R === 1) {
                    if (C === 0 || C === 2) {
                      cell.s = periodLabelStyle;
                    } else {
                      cell.s = periodValueStyle;
                    }
                  } else if (R === 3 || R === 4) {
                    if (C <= 2) {
                      cell.s = headerGreenStyle;
                    } else {
                      cell.s = headerBlueStyle;
                    }
                  } else if (R >= 5) {
                    if (isStateTotal) {
                      cell.s = (C <= 1) ? stateTotalStyleLeft : stateTotalStyleCenter;
                    } else if (isGeneralTotal) {
                      cell.s = (C <= 1) ? generalTotalStyleLeft : generalTotalStyleCenter;
                    } else {
                      cell.s = (C === 0) ? dataStyleLeft : dataStyleCenter;
                    }
                  }
                }
              }

              sheet["!cols"] = [
                { wch: 30 },
                { wch: 18 },
                { wch: 12 },
                { wch: 10 },
                { wch: 10 },
                { wch: 10 }
              ];

              const workbookBinary = XLSX.write(workbook, {
                type: "binary",
                bookType: "xlsx",
              });
              const octetStream = this.binary2octet(workbookBinary);

              const parts = response.schoolYear.split("-");
              const finalYear = parts[parts.length - 1].trim();
              const pad = (n) => n < 10 ? '0' + n : n;
              const now = new Date();
              const dateStr = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}_${pad(now.getHours())}-${pad(now.getMinutes())}`;
              const fileName = `Reporte-pines-${finalYear}_${dateStr}.xlsx`;

              saveAs(
                new Blob([octetStream], { type: "application/octet-stream" }),
                fileName
              );
            }
          } else {
            this.toastr.info("Información", "No se encontraron escuelas para este período");
          }

          setTimeout(() => {
            this.disabledBtn = false;
            this.cd.detectChanges();
          }, 1500);
        },
        (err: any) => {
          this.toastr.error("Error", "No se pudo obtener la información para el reporte");
          this.disabledBtn = false;
          this.cd.detectChanges();
        }
      );
  }

  makePinsExcel(report: any): string {
    const reportDate = formatDate(report.date, "dd/MM/yyyy", "es-VE");

    let totalEnrollment = 0;
    let totalReading = 0;
    let totalMath = 0;
    let totalLogic = 0;

    let currentState = "";
    let stateEnrollment = 0;
    let stateReading = 0;
    let stateMath = 0;
    let stateLogic = 0;

    let rowsHtml = "";

    const appendStateTotalRowHtml = (stateName: string) => {
      rowsHtml += `
        <tr>
          <td colspan="2" class="state-bold-left">Total ${stateName}</td>
          <td class="state-bold-center">${stateEnrollment}</td>
          <td class="state-bold-center">${stateReading}</td>
          <td class="state-bold-center">${stateMath}</td>
          <td class="state-bold-center">${stateLogic}</td>
        </tr>
      `;
    };

    report.schools.forEach((school: any, index: number) => {
      const schoolState = school.state || "Sin Estado";

      if (currentState !== "" && currentState !== schoolState) {
        appendStateTotalRowHtml(currentState);
        stateEnrollment = 0;
        stateReading = 0;
        stateMath = 0;
        stateLogic = 0;
      }

      currentState = schoolState;

      stateEnrollment += school.enrollment || 0;
      stateReading += school.readingOverGoal || 0;
      stateMath += school.mathOverGoal || 0;
      stateLogic += school.logicOverGoal || 0;

      totalEnrollment += school.enrollment || 0;
      totalReading += school.readingOverGoal || 0;
      totalMath += school.mathOverGoal || 0;
      totalLogic += school.logicOverGoal || 0;

      rowsHtml += `
        <tr>
          <td class="cell-text">${school.schoolName}</td>
          <td class="cell-center">${school.state || ""}</td>
          <td class="cell-center">${school.enrollment || 0}</td>
          <td class="cell-center">${school.readingOverGoal}</td>
          <td class="cell-center">${school.mathOverGoal}</td>
          <td class="cell-center">${school.logicOverGoal}</td>
        </tr>
      `;

      if (index === report.schools.length - 1) {
        appendStateTotalRowHtml(currentState);
      }
    });

    const totalsHtml = `
      <tr>
        <td colspan="2" class="total-bold-left">Total general</td>
        <td class="total-bold-center">${totalEnrollment}</td>
        <td class="total-bold-center">${totalReading}</td>
        <td class="total-bold-center">${totalMath}</td>
        <td class="total-bold-center">${totalLogic}</td>
      </tr>
    `;

    const excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-excel:office:office" xmlns:x="urn:schemas-microsoft-excel:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
       <x:ExcelWorkbook>
        <x:ExcelWorksheets>
         <x:ExcelWorksheet>
          <x:Name>Reporte de pines</x:Name>
          <x:WorksheetOptions>
           <x:DisplayGridlines/>
          </x:WorksheetOptions>
         </x:ExcelWorksheet>
        </x:ExcelWorksheets>
       </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        .title { font-size: 16px; font-weight: bold; text-align: center; color: #2e8aaa; }
        .header-green { background-color: #81b03e; color: #FFFFFF; font-weight: bold; text-align: center; vertical-align: middle; border: 0.5pt solid #CCCCCC; }
        .header-blue { background-color: #00809a; color: #FFFFFF; font-weight: bold; text-align: center; vertical-align: middle; border: 0.5pt solid #CCCCCC; }
        .cell-text { text-align: left; border: 0.5pt solid #CCCCCC; }
        .cell-center { text-align: center; border: 0.5pt solid #CCCCCC; }
        .state-bold-left { font-weight: bold; background-color: #F9F9F9; text-align: left; border: 0.5pt solid #CCCCCC; }
        .state-bold-center { font-weight: bold; background-color: #F9F9F9; text-align: center; border: 0.5pt solid #CCCCCC; }
        .total-bold-left { font-weight: bold; background-color: #F5F5F5; text-align: left; border: 0.5pt solid #CCCCCC; }
        .total-bold-center { font-weight: bold; background-color: #F5F5F5; text-align: center; border: 0.5pt solid #CCCCCC; }
      </style>
      </head>
      <body>
      <table>
        <tr><td colspan="6" class="title">Reporte de pines</td></tr>
        <tr>
          <td style="font-weight: bold;">Período académico:</td>
          <td>${report.schoolYear}</td>
          <td style="font-weight: bold;">Fecha:</td>
          <td>${reportDate}</td>
          <td></td>
          <td></td>
        </tr>
        <tr><td colspan="6"></td></tr>
        <tr>
          <th rowspan="2" class="header-green" style="width: 250px;">Escuela</th>
          <th rowspan="2" class="header-green" style="width: 150px;">Estado</th>
          <th rowspan="2" class="header-green" style="width: 100px;">Matrícula</th>
          <th colspan="3" class="header-blue">Estudiantes sobre la meta</th>
        </tr>
        <tr>
          <th class="header-blue" style="width: 80px;">PPM</th>
          <th class="header-blue" style="width: 80px;">M2M</th>
          <th class="header-blue" style="width: 80px;">L60M</th>
        </tr>
        ${rowsHtml}
        ${totalsHtml}
      </table>
      </body>
      </html>
    `;

    return excelTemplate;
  }

  binary2octet(binary): ArrayBuffer {
    const buffer = new ArrayBuffer(binary.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binary.length; i++) {
      view[i] = binary.charCodeAt(i) & 0xff;
    }
    return buffer;
  }
}
