import { Component, OnInit } from '@angular/core';
import {AtlasException} from '../../../shared/atlas/entity.service';
import {DocumentationService} from '../../../services/documentation.service';

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
