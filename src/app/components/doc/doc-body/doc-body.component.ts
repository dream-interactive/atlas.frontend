import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'atlas-doc-body',
  templateUrl: './doc-body.component.html',
  styleUrls: ['./doc-body.component.scss']
})
export class DocBodyComponent implements OnInit {
  @HostBinding('class') class = 'atlas-doc-body';

  constructor() { }

  ngOnInit(): void {
  }

}
