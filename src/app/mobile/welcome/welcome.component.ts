import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

import {
  Page,
  ContentView,
  SwipeGestureEventData,
  GridLayout,
  GridUnitType,
  ItemSpec,
  AnimationDefinition,
  Animation, Builder, isAndroid, Application

} from '@nativescript/core';
declare var android: any;
import {Screen} from '@nativescript/core/platform/index.android';

import * as fs from 'file-system';
import {WelcomeSlidesService} from '@src/app/mobile/welcome/welcome-slides.service';


@Component({
  selector: 'welcome',
  moduleId: module.id,
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  private slidesPath = 'pages/welcome/slides';
  private slideFiles = ['slide1.xml', 'slide2.xml', 'slide3.xml'];

  private currentSlideNum = 0;
  private slideCount = 3;

  private screenWidth;
  private slidesView: GridLayout;

  @ViewChild('slideContent') slideElement: ElementRef;
  private slideView: ContentView;

  constructor(
    private page: Page,
    private nav: RouterExtensions,
    private slidesService: WelcomeSlidesService
  ) {
    this.screenWidth = Screen.mainScreen.widthDIPs;

    // Span the background under status bar on Android
    if (isAndroid /*&& device.sdkVersion >= '21'*/) {
      const View = android.view.View;
      const window = Application.android.startActivity.getWindow();
      window.setStatusBarColor(0x000000);

      const decorView = window.getDecorView();
      decorView.setSystemUiVisibility(
        View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.cssClasses.add('welcome-page-background');
    this.page.backgroundSpanUnderStatusBar = true;

    this.slideView = this.slideElement.nativeElement;

    this.loadSlides(this.slidesService.getSlides()).then((slides: any) => {
      const row = new ItemSpec(1, GridUnitType.STAR);
      const gridLayout = new GridLayout();
      slides.forEach((element, i) => {
        GridLayout.setColumn(element, 0);
        if (i > 0) {
          element.opacity = 0;
        }
        gridLayout.addChild(element);
      });
      gridLayout.addRow(row);
      this.slideView.content = (this.slidesView = gridLayout);
    });
  }

  private loadSlides(slides) {
    return new Promise((resolve, reject) => {
      const slideViews = [];
      slides.forEach((slide, i) => {
        slideViews.push(Builder.parse(slide));
      });

      resolve(slideViews);
    });
  }

  skipIntro() {
    // this.nav.navigate(["/home"], { clearHistory: true });
    this.nav.navigate(['/organization']);
  }

  onSwipe(args: SwipeGestureEventData) {
    const prevSlideNum = this.currentSlideNum;
    const count = this.slideCount;
    if (args.direction === 2) {
      this.currentSlideNum = (this.currentSlideNum + 1) % count;
    } else if (args.direction === 1) {
      this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
    } else {
      // We are interested in left and right directions
      return;
    }

    const currSlide = this.slidesView.getChildAt(prevSlideNum);
    const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);

    this.animate(currSlide, nextSlide, args.direction);
  }

  animate(currSlide, nextSlide, direction) {
    nextSlide.translateX = (direction === 2 ? this.screenWidth : -this.screenWidth);
    nextSlide.opacity = 1;
    const definitions = new Array<AnimationDefinition>();
    const defn1: AnimationDefinition = {
      target: currSlide,
      translate: { x: (direction === 2 ? -this.screenWidth : this.screenWidth), y: 0 },
      duration: 500
    };
    definitions.push(defn1);

    const defn2: AnimationDefinition = {
      target: nextSlide,
      translate: { x: 0, y: 0 },
      duration: 500
    };
    definitions.push(defn2);

    const animationSet = new Animation(definitions);
    animationSet.play()
      .then(() => {
        // console.log("Animation finished");
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  itemSelected(item: number) {

    console.log(item);
  }

  getSliderItemClass(item: number) {
    if (item === this.currentSlideNum) {
      return 'caro-item-dot caro-item-dot-selected';
    }

    return 'caro-item-dot';
  }
}
