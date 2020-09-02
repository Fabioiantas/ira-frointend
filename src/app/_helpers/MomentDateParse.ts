import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

export class MomentDateFormatter extends NgbDateParserFormatter {

  readonly DT_FORMAT = 'YYYY-MM-DD';

  parse(value: string): NgbDateStruct {
    console.log('MomentDateFormatter: ' + value);
    if (value) {
      value = value.trim();
    }
    return null;
  }
  format(date: NgbDateStruct): string {
    console.log('MomentDateFormatter: ' + date);
    if (!date) { return ''; }
    const mdt = moment([date.year, date.month, date.day]);
    if (!mdt.isValid()) { return ''; }
    return mdt.format(this.DT_FORMAT);
  }
}
