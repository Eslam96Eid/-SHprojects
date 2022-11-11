import { ChartConfiguration } from 'chart.js';

import { KeyValue } from '@angular/common';


export class SchoolChartsModel {

    schoolCurriculumDatasets: ChartConfiguration<'doughnut'>['data']['datasets'];
    schoolCurriculumOptions: ChartConfiguration<'doughnut'>['options'] = {
      responsive: false
    };

    shoolCurriculumChartLabels: Array<KeyValue<string, number>> = [];

    schoolCityDatasets: ChartConfiguration<'bar'>['data']['datasets'];
    schoolCityOptions: ChartConfiguration<'bar'>['options'] = {
      responsive: false, };
    schoolCityChartLabels: Array<KeyValue<string, number>> = [];
     // schoolCityChartLabels= ['المنطقة الوسطى', 'المنطقة الشرقية', 'المنطقة الشارقة'];


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
  schoolCity: object;
  totalSchoolCount: number;
}



