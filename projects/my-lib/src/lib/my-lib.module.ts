import { NgModule } from '@angular/core';
import { MyLibComponent } from './my-lib.component';


(<any>window).PDFJS_LOCALE = {
  pdfJsWorker: 'assets/js/pdf.worker.js',
  pdfJsCMapUrl: 'cmaps'
};

@NgModule({
  declarations: [MyLibComponent],
  imports: [
  ],
  exports: [MyLibComponent]
})
export class MyLibModule { }
