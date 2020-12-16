import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'atlas-doc',
  templateUrl: './atlas-doc.component.html',
  styleUrls: ['./atlas-doc.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AtlasDocComponent implements OnInit {

  @HostBinding('class') class = 'atlas-doc';

  constructor() { }

  ngOnInit(): void {
  }

}
