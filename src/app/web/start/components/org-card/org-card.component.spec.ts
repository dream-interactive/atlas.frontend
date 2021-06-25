import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrgCardComponent } from './org-card.component';

describe('OrgCardComponent', () => {
  let component: OrgCardComponent;
  let fixture: ComponentFixture<OrgCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
