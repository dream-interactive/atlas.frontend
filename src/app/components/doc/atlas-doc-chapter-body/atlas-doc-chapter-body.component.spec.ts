import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasDocChapterBodyComponent } from './atlas-doc-chapter-body.component';

describe('AtlasDocChapterBodyComponent', () => {
  let component: AtlasDocChapterBodyComponent;
  let fixture: ComponentFixture<AtlasDocChapterBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasDocChapterBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasDocChapterBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
