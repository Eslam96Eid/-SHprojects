import { ChartConfiguration } from 'chart.js';

import { KeyValue } from '@angular/common';


export class SchoolChartsModel {

    schoolCurriculumDatasets: ChartConfiguration<'doughnut'>['data']['datasets'];
    schoolCurriculumOptions: ChartConfiguration<'doughnut'>['options'] = {
      responsive: false,

    };

    shoolCurriculumChartLabels: Array<KeyValue<string, number>> = [];
    activeSchoolsDatasets: ChartConfiguration<'doughnut'>['data']['datasets'];
    activeSchoolsChartLabels = ['مفعلة', 'غير مفعلة'];
    activeSchoolsOptions: ChartConfiguration<'doughnut'>['options'] = {
      responsive: false,
    };
    regionSchoolsData: ChartConfiguration<'bar'>['data'];
    regionSchoolPlugins = [];
    regionSchoolChartLabels = ['المنطقة الوسطى', 'المنطقة الشرقية', 'المنطقة الشارقة'];
    regionSchoolsOptions: ChartConfiguration<'doughnut'>['options'] = {
      responsive: false,

      plugins: {
        legend: {
            labels: {

                // This more specific font property overrides the global property
                font: {
                    size: 70
                }
            }
        }
    }
    };
    chartData: ISchoolChart;
}

export interface ISchoolChart {
  activeSchoolCount: number;
  inActiveSchoolCount: number;
  schoolCountInCentralRegion: number;
  schoolCountInEasternProvince: number;
  schoolCountInSharjahCity: number;
  schoolCurriculum: object;
  totalSchoolCount: number;
}



