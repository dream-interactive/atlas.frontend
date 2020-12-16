import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocChapterComponent } from './doc-chapter.component';

describe('DocChapterComponent', () => {
  let component: DocChapterComponent;
  let fixture: ComponentFixture<DocChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocChapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
