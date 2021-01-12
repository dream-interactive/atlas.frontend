import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'atlas-doc-chapter-body',
  templateUrl: './atlas-doc-chapter-body.component.html',
  styleUrls: ['./atlas-doc-chapter-body.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom

})
export class AtlasDocChapterBodyComponent implements OnInit {
  @HostBinding('class') class = 'atlas-doc-chapter-body';

  constructor() { }

  ngOnInit(): void {
  }

}
