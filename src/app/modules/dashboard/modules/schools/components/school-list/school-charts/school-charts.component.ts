import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'chart.js';
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

  constructor(
    private schoolService: SchoolsService,
    private translate: TranslateService,
    public loaderService:LoaderService,
    private headerService: HeaderService,
    private exportService: ExportService,

    private sharedService: SharedService,

  ) {

    this.initModels();
    Chart.defaults.font.size = 17;
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
      // this.schools.total=0

    //   if (res) {


    //     this.model.chartData = res;
    //     this.schools.isLoading = true
    //     this.setCurriculumChartChartData();
    //     this.setRegionSchoolsChartData();
    //     this.setActiveSchoolsChartData();



    //   }(err)=> {
    //     // this.schools.loading=true
    //     this.isLoading = false;
    //     this.schools.total=0

    // }
  });
  }

  private setCurriculumChartChartData(): void {
    const schoolCurriculum = this.model.chartData.schoolCurriculum;
    if (schoolCurriculum) {
      const schoolCurriculumValues = Object.values(schoolCurriculum);
      const isArabic = this.translate.currentLang === 'ar';
      this.model.schoolCurriculumDatasets = [{data: schoolCurriculumValues}];
      for (const key in schoolCurriculum) {
        this.model.shoolCurriculumChartLabels.push({
          key: isArabic ? key.slice(3, key.indexOf(',')) : key.slice(key.lastIndexOf(':') + 1, key.length),
          value: schoolCurriculum[key]
        });
      }
    }
  }

  private setRegionSchoolsChartData(): void {

    const chartData = this.model.chartData;

    this.model.regionSchoolsData = {
      labels: this.model.regionSchoolChartLabels,
      datasets: [

        { data: [
          chartData.schoolCountInEasternProvince,
          chartData.schoolCountInCentralRegion,
          chartData.schoolCountInSharjahCity
        ], barThickness:30,barPercentage:0.7,borderRadius:25,
         backgroundColor: ["#CD578A",  "#F8C073" ,"#5CD0DF", "#fefefe"]},
      ],

    };
  }

  private setActiveSchoolsChartData(): void {
    const chartData = this.model.chartData;
    this.model.activeSchoolsDatasets = [
      {
        data: [chartData.activeSchoolCount, chartData.inActiveSchoolCount],
        backgroundColor: ["#F8C073", "#5CD0DF"]},

    ];
  }

}
