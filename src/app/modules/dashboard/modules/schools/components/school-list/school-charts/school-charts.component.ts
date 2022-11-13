import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart, Color } from 'chart.js';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../services/schools/schools.service';

import { SchoolChartsModel } from './school-chart.models';

@Component({
  selector: 'app-school-charts',
  templateUrl: './school-charts.component.html',
  styleUrls: ['./school-charts.component.scss']
})
export class SchoolChartsComponent implements OnInit {
  isSkeletonVisible = true;
  model: SchoolChartsModel;
  value=0

  constructor(
    private schoolService: SchoolsService,
    private translate: TranslateService,
    public loaderService:LoaderService,
    private headerService: HeaderService,
    private exportService: ExportService,
    private sharedService: SharedService,
 ) {
    this.initModels();
    Chart.defaults.font.size = 11;
    Chart.defaults.font.family='Droid',
    Chart.defaults.scale.grid.display=false;

    // Chart.defaults.backgroundColor='["#CD578A","#CD578A","#5CD0DF", "#fefefe"]'

  }

  ngOnInit(): void {
    this.getChartData();
  }

  private initModels(): void {
    this.model = new SchoolChartsModel();
  }


  private getChartData(): void {

    this.schoolService.getCharts().subscribe(res => {
      if (res) {
        this.model.chartData = res;
      this.setCurriculumChartChartData();
      this.setRegionSchoolsChartData();
      this.setActiveSchoolsChartData();
      this.isSkeletonVisible = false;
    }
    },err=> {
      this.isSkeletonVisible=false;
  });
  }

  private setCurriculumChartChartData(): void {
    const schoolCurriculum = this.model.chartData.schoolCurriculum;

    if (schoolCurriculum) {
      const schoolCurriculumValues = Object.values(schoolCurriculum);
      const isArabic = this.translate.currentLang === 'ar';
      this.model.schoolCurriculumDatasets = [{data: schoolCurriculumValues, backgroundColor:["#CD578A","#5BCEDD", "#F8C073","#f1f2f4","#93d9d9","#c1d6e1","#ff9776"]}];
      for (const key in schoolCurriculum) {
        this.model.shoolCurriculumChartLabels.push({
          key: isArabic ? key.slice(3, key.indexOf(',')) : key.slice(key.lastIndexOf(':') + 1, key.length),
          value: schoolCurriculum[key]
        });
      }
    }
  }


  private setRegionSchoolsChartData(): void {
    const schoolCity = this.model.chartData.schoolCity;
    if (schoolCity) {

      const schoolCityValues = Object.values(schoolCity);
      const isArabic = this.translate.currentLang === 'ar';
      this.model.schoolCityDatasets = [{data: schoolCityValues, backgroundColor:["#CD578A","#5BCEDD","#5CD0DF", "#fefefe"], barThickness:30,barPercentage:0.7,borderRadius:25,}];
      for (const key in schoolCity) {
        const name = isArabic ? key.slice(3, key.indexOf(',')) : key.slice(key.lastIndexOf(':') + 1, key.length);
        this.model.schoolCityChartLabels.push({
          key: name,
          value: schoolCity[key]
        });
        this.model.schoolCityChartStringLabels.push(name);
      }
    }
  }

  // private setRegionSchoolsChartData(): void {

  //   const chartData = this.model.chartData;

  //   this.model.regionSchoolsData = {
  //     labels: this.model.regionSchoolChartLabels,
  //     datasets: [

  //       { data: [
  //         chartData.schoolCountInEasternProvince,
  //         chartData.schoolCountInCentralRegion,
  //         chartData.schoolCountInSharjahCity
  //       ], barThickness:30,barPercentage:0.7,borderRadius:25,
  //        backgroundColor: ["#F8C073","#CD578A","#5CD0DF", "#fefefe",],
  //       },
  //     ],

  //   };
  // }

  private setActiveSchoolsChartData(): void {
    const chartData = this.model.chartData;
    this.model.activeSchoolsDatasets = [
      {
        data: [chartData.activeSchoolCount, chartData.inActiveSchoolCount],
        backgroundColor: ["#F8C073", "#5CD0DF"]},

    ];
  }

}
