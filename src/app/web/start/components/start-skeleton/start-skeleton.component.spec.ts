import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSkeletonComponent } from './start-skeleton.component';

describe('StartSkeletonComponent', () => {
  let component: StartSkeletonComponent;
  let fixture: ComponentFixture<StartSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
