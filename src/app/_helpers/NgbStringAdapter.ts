import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbStringAdapter extends NgbDateAdapter<Date> {
  fromModel(date: Date): NgbDateStruct {
    console.log('dt: ' + date);
    return date ? {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate()
    } : null;
  }

  toModel(date: NgbDateStruct): Date {
     return date ? new Date(Date.UTC(date.year, date.month, date.day, 0, 0, 0)) : null;
  }
}
