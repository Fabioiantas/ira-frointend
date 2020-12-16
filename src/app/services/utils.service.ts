import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public static storage:any = localStorage;

  constructor(private modalService: BsModalService) { }

  static dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = decodeURI(dataURI.split(',')[1]);
    }
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for(var i = 0; i < byteString.length; i++) {
      array.push(byteString.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  };



  static removeDuplicates(arr, prop) {
    let obj = {};
    return Object.keys(arr.reduce((prev, next) => {
      if (!obj[next[prop]]) obj[next[prop]] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
  }

  objectEquals(a1, b2) {
    let a = Object.assign({}, a1);
    let b = Object.assign({}, b2);

    for(let key in b){
      if(key.charAt(0) == '_')
        delete b[key];
    };

    for(let key in a){
      if(key.charAt(0) == '_')
        delete a[key];
    };

    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }



  static formatDate(data) {
    data = data.split("/");
    if (!data[1]) return data[0];
    var ano = data[2];
    var mes = data[1];
    var dia = data[0];
    return ano + "-" + mes + "-" + dia;
  }

  static formatDateBr(data) {
    if (data.length == 10)
      return data;
    return moment(data).format("DD/MM/YYYY");
  }

  static compareDate(start, init, end, tipo) {
    if (!tipo) { tipo = 'dentro'; }
    start = Date.parse(start);
    init = Date.parse(init);
    end = Date.parse(end);
    if (tipo == 'dentro') {
      return (start >= init && start <= end);
    } else if (tipo == 'fora') {
      return (start > end || start < init);
    }
  }

  static statusColor(status) {
    var st = { "P": "bg-red", "V": "bg-yellow", "A": "bg-blue", "E": "bg-green", "L": "bg-black", "R": "bg-default" };
    return st[status];
  }

  static downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }
}
