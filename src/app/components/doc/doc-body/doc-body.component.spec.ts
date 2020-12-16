import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocBodyComponent } from './doc-body.component';

describe('DocBodyComponent', () => {
  let component: DocBodyComponent;
  let fixture: ComponentFixture<DocBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
