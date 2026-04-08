import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslat {
  myTranslat() {
    if (localStorage.getItem('lang') == 'en') {
      document.documentElement.setAttribute('dir', 'Itr');
      document.documentElement.setAttribute('lang', 'en');
    } else {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    }
  }
}
