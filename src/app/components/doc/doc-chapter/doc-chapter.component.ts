import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'atlas-doc-chapter',
  templateUrl: './doc-chapter.component.html',
  styleUrls: ['./doc-chapter.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DocChapterComponent implements OnInit {

  @HostBinding('class') class = 'atlas-doc-chapter';

  constructor() { }

  ngOnInit(): void {
  }

}
