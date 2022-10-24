import { Injectable } from '@angular/core';
import { FileEnum } from '../../enums/file/file.enum';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }


  exportFile(extention : FileEnum, table: Table, items: any[]){
    
    if(extention === FileEnum.CSV){
      table.exportCSV()

    }else if(extention === FileEnum.XLSX){
      
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(items);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
      });
    }


  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


}
