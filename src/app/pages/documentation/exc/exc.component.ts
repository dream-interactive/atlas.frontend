import { Component, OnInit } from '@angular/core';
import {AtlasException} from '../../../shared/atlas/entity.service';
import {DocumentationService} from '../../../services/documentation.service';
import {ChapterNodes} from '../../../../../../atlas-docs-lib/dist/atlas-docs';

@Component({
  selector: 'app-exc',
  templateUrl: './exc.component.html',
  styleUrls: ['./exc.component.scss']
})
export class ExcComponent implements OnInit {

  exceptions: AtlasException[] = [];
  chapters: string[] = [];

  logCode = `log.error(String.format(
        " @method [ Mono<AtlasUserAuthDTO> updateEmailVerification(Mono<AtlasUserAuthDTO> dto ] -> " +
        " ATLAS-102: user ids does not match. "                                                      +
        " [ Principal: %1$s ], "                                                                     +
        " [ atlasUserAuthDTO.getSub(): %2$s ] "                                                      ,
        uid,
        atlasUserAuthDTO.getSub()
));`;
  messageCode = `return Mono.error(new CustomRequestException("ATLAS-102", HttpStatus.NOT_MODIFIED));`;

  chapter1: ChapterNodes = {
    children: [], componentID: 'chapter-1', name: 'Chapter 1'
  };
  subChapter: ChapterNodes = {
    children: [], componentID: 'SubChapter-2', name: 'SubChapter 2'
  };
  chapter3: ChapterNodes = {
    children: [this.subChapter], componentID: 'chapter-3', name: 'Chapter 3'
  };
  nodes: ChapterNodes[] = [this.chapter1, this.chapter3];


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
