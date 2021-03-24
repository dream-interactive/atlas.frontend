import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionsPageComponent } from './exceptions-page.component';

describe('ExceptionsPageComponent', () => {
  let component: ExceptionsPageComponent;
  let fixture: ComponentFixture<ExceptionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExceptionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
