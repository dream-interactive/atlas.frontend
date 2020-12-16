import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'atlas-doc-title',
  templateUrl: './doc-title.component.html',
  styleUrls: ['./doc-title.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocTitleComponent implements OnInit {
  @HostBinding('class') class = 'atlas-doc-title';

  constructor() { }

  ngOnInit(): void {
  }

}
