import {Component, OnInit} from '@angular/core';
import {ThemeService} from './services/theme.service';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {
  }
  ngOnInit(): void {
   // this.themeService.theme$.subscribe(theme => {
   //   if (theme) {
   //     this.themeService.darkMode();
   //   } else {
   //     this.themeService.lightMode();
   //   }
   // });
  }

}
