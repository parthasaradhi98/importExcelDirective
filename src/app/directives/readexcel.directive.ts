import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';

@Directive({
  selector: '[appReadexcel]',
  exportAs: 'readexcel',
})

export class ReadexcelDirective {
  excelObservable: Observable<any>;
  @Output() eventEmitter = new EventEmitter();


  constructor() { }
  headers: Array<string> = ["Id", "Description", "Display pic", "document attachments", "Group", "location", " name", "price", "product model number", "purchased on", " Retire", "Retired on", "salvage value", " sub group", "vendor"];
  columns: Array<string> = ["col1", "col2", "col3", "col4", "col5", "col6", "col7", "col8", "col9", "col10", "col11", "col12", "col13", "col14", "col15"];

  headerArray: Array<string> = [];

  @HostListener('change', ['$event.target'])
  onChange(target: HTMLInputElement) {
    const file = target.files[0];

    this.excelObservable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    this.excelObservable.subscribe((d) => {
      this.eventEmitter.emit(d);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {

    const fileReader = new FileReader();
    var Ext = file.name.split('.')[1];
    console.log(Ext);
    if (Ext == "csv") {
      fileReader.readAsText(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'string' });
        const wsname: string = wb.SheetNames[0];

        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        var output = data.map(function (obj) {
          return Object.keys(obj).map(function (key) {
            return obj[key];
          });
        });

        var keys = Object.keys(data[0]);
        output.unshift(keys);

        for (let j = 0; j < keys.length; j++) {
          this.headerArray.push(keys[j]);
        }

        subscriber.next(output);
        subscriber.complete();
      };
    }
    else {
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname: string = wb.SheetNames[0];

        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        var output = data.map(function (obj) {
          return Object.keys(obj).map(function (key) {
            return obj[key];
          });
        });
        var keys = Object.keys(data[0]);
        output.unshift(keys);

        subscriber.next(output);
        subscriber.complete();
      };
    }
  }
}


