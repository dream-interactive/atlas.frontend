import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {filter, startWith} from 'rxjs/operators';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isVisible = true;

  constructor(private router: Router) {
    router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        startWith(router)
      ).subscribe((event: NavigationStart) => {
      if (event.url.match(new RegExp('/o/([a-z0-9-])+/'))) {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    });
  }

  ngOnInit(): void {
  }

}
