import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSubchapterComponent } from './doc-subchapter.component';

describe('DocSubchapterComponent', () => {
  let component: DocSubchapterComponent;
  let fixture: ComponentFixture<DocSubchapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocSubchapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocSubchapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
