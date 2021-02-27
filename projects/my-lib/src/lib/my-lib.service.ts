import { Injectable } from '@angular/core';
import concat from 'lodash.concat';

@Injectable({
  providedIn: 'root'
})
export class MyLibService {

  constructor() { }


  doSomething() {
    // Make sure tree shaking won't remove the lib during the build
    console.log("aaaa concat...............",concat([1], 2))
  }
}
