import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasDocComponent } from './atlas-doc.component';

describe('AtlasDocComponent', () => {
  let component: AtlasDocComponent;
  let fixture: ComponentFixture<AtlasDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
