import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantidadePipe'
})
export class QuantidadePipePipe implements PipeTransform {

  transform(data: any, args?: any): any {
    if (data == undefined || data == null) return;

    var plainNumber = data.toString().replace(".",",");

    if (plainNumber.indexOf(",") >= 0) {
      var intValue = plainNumber.split(",")[0];
      var decimalValue = plainNumber.split(",")[1];
      if (decimalValue.length > 3) {
        decimalValue = decimalValue.substring(0,3);
      }
      if (decimalValue == "") {
        plainNumber = intValue + ",000";
      } else {
        plainNumber = intValue + "," + decimalValue;
      }
    } else {
      plainNumber = plainNumber + ",000";
    }
    return Number(plainNumber.replace(",", ".")).toLocaleString("pt-BR",{minimumFractionDigits: 3});
  }

}



