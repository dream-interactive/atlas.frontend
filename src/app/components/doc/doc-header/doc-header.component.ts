import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'atlas-doc-header',
  templateUrl: './doc-header.component.html',
  styleUrls: ['./doc-header.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DocHeaderComponent implements OnInit {
  @HostBinding('class') class = 'atlas-doc-header';

  constructor() { }

  ngOnInit(): void {
  }

}
