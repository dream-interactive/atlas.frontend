import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'atlas-doc-subchapter',
  templateUrl: './doc-subchapter.component.html',
  styleUrls: ['./doc-subchapter.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DocSubchapterComponent implements OnInit {
  @HostBinding('class') class = 'atlas-doc-subchapter';

  constructor() { }

  ngOnInit(): void {
  }

}
