import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcComponent } from './exc.component';

describe('ExcComponent', () => {
  let component: ExcComponent;
  let fixture: ComponentFixture<ExcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
