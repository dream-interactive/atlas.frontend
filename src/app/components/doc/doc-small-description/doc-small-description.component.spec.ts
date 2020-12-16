import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSmallDescriptionComponent } from './doc-small-description.component';

describe('DocSmallDescriptionComponent', () => {
  let component: DocSmallDescriptionComponent;
  let fixture: ComponentFixture<DocSmallDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocSmallDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocSmallDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
