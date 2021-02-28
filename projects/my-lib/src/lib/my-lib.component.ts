import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MyLibService } from './my-lib.service';

declare var $:any;
declare var FlipBook:any;
declare var THREE:any;

@Component({
  selector: 'lib-my-lib',
  template: `
    <p>
      my-lib works! test 2
    </p>

    <div class="container" id="container"></div>
  `,
  styles: [`
    .container {
      height: 95vh;
      width: 95%;
      margin: 20px auto;
      border: 2px solid red;
      box-shadow: 0 0 5px red;
    }
  `
  ]
})
export class MyLibComponent implements OnInit {

  constructor(
    private readonly svc: MyLibService,
    @Inject(DOCUMENT) private readonly document: any
  ) { }

  ngOnInit(): void {
    this.svc.lazyLoadQuill().subscribe(_ => {
      console.log("lazyLoadQuill=",_)
      if (!$) {
        $ = this.document.defaultView.$;
      }
      this.setupJQuery();

      if(THREE){
        THREE = this.document.defaultView.THREE;
      }

      // if(!FlipBook){
      //   FlipBook = this.document.defaultView.FlipBook;
      // }

       $('#container').FlipBook({
        pdf: 'assets/books/pdf/FoxitPdfSdk.pdf',
        template: {
          html: 'assets/templates/default-book-view.html',
          styles: [
            'assets/css/short-black-book-view.css'
          ],
          links: [
            {
              rel: 'stylesheet',
              href: 'assets/css/font-awesome.min.css'
            }
          ],
          script: 'assets/js/default-book-view.js'
        }
      });
    });
  }

  setupJQuery() {
    if (!$) {
      return;
    }
    // set up External JS library
  }

}
