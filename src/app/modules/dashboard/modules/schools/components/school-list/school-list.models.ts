import { faHome, faFilter, faSearch, faAngleLeft, faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';

import { IHeader } from 'src/app/core/Models/iheader';


export class SchoolListModel {

    faHome = faHome;
    faFilter = faFilter;
    faSearch = faSearch;
    faCoffee = faHouse;
    faAngleLeft = faAngleLeft;
    faAngleRight = faAngleRight;
    userAppData: any;
    appUserCount1: any;
    appUserCount2: any;
    appUserCount3: any;
    appUserCount4: any;
    appUserCount5: any;
    userLabel: any;

    componentHeaderData: IHeader = {
      breadCrump: [
        { label: 'قائمه المدارس ' ,routerLink: '/dashboard/schools-and-students/schools'},
      ],
    }
    first = 0
    rows = 8


    employeeOrgData; orgCount1;
    orgCount2; orgCount3; orgCount4; orgCount5; employeeLabel: any;
    employeeJIRAHoursData;


}

