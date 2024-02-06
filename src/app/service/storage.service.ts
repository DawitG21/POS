import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setData(property: string, data: any) {
    localStorage.setItem(`pos.${property}`, JSON.stringify(data));
  }

  getData(property: string) {
    let data = localStorage.getItem(`pos.${property}`) ?? '';
    if (data) {
      return JSON.parse(data);
    }
    // return JSON.parse(localStorage.getItem(`doceipt.${property}`) ?? '');
  }

  deleteData(property: string) {
    localStorage.removeItem(`pos.${property}`);
  }
}
