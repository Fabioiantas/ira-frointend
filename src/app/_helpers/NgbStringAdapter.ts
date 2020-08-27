import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbStringAdapter extends NgbDateAdapter<Date> {
  fromModel(date: Date): NgbDateStruct {
    console.log('NgbStringAdapter fromModel: ' + date);
    return date ? {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      day: date.getUTCDate()
    } : null;
  }

  toModel(date: NgbDateStruct): Date {
    console.log('NgbStringAdapter toModel: ' + date);
    return date ? new Date(Date.UTC(date.year, date.month, date.day, 0, 0, 0)) : null;
  }
}
