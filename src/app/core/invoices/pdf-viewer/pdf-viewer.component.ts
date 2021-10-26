import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
 doc: any
  constructor(private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.doc = "/home/nkosana/Documents/Personal/open-source/assets/uploads/nkosana_nikani_2021-10-26%2017:34:39.603317.pdf";
  }

}
