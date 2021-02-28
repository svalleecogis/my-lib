import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import concat from 'lodash.concat';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyLibService {

  private _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};
  
  constructor(@Inject(DOCUMENT) private readonly document: any) {}

  lazyLoadQuill(): Observable<any> {
    return forkJoin([
      this.loadScript('assets/js/jquery.min.js'),
      this.loadScript('assets/js/html2canvas.min.js'),
      this.loadScript('assets/js/three.min.js'),
      this.loadScript('assets/js/pdf.min.js'),
      this.loadScript('assets/js/3dflipbook.min.js'),

     // this.loadStyle('assets/quill/quill.snow.css')
    ]);
  }

  private loadScript(url: string): Observable<any> {
    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };

    this.document.body.appendChild(script);

    return this._loadedLibraries[url].asObservable();
  }

  private loadStyle(url: string): Observable<any> {
    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const style = this.document.createElement('link');
    style.type = 'text/css';
    style.href = url;
    style.rel = 'stylesheet';
    style.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);

    return this._loadedLibraries[url].asObservable();
  }

  doSomething() {
    // Make sure tree shaking won't remove the lib during the build
    console.log("aaaa concat...............",concat([1], 2))
  }
}
