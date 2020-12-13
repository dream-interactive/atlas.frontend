import { Component, OnInit } from '@angular/core';
import {DocumentationService} from '../../../services/documentation.service';
import {AtlasException} from '../../../shared/atlas/entity.service';

@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.component.html',
  styleUrls: ['./exceptions.component.scss']
})
export class ExceptionsComponent implements OnInit {

  exceptions: AtlasException[] = [];
  chapters: string[] = [];

  constructor(private ds: DocumentationService) { }

  ngOnInit(): void {
    this.ds.findAllExceptions().subscribe((excs)  => {
      const chaptersSet = new Set<string>();
      excs.forEach(e => chaptersSet.add(e.section));
      this.chapters = [...chaptersSet];
      this.exceptions = excs;
    });

  }

}
