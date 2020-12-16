import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'atlas-doc-small-description',
  templateUrl: './doc-small-description.component.html',
  styleUrls: ['./doc-small-description.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DocSmallDescriptionComponent implements OnInit {
  @HostBinding('class') class = 'atlas-doc-small-description';

  constructor() { }

  ngOnInit(): void {
  }

}
