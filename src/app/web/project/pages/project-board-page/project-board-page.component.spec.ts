import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoardPageComponent } from './project-board-page.component';

describe('ProjectBoardPageComponent', () => {
  let component: ProjectBoardPageComponent;
  let fixture: ComponentFixture<ProjectBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectBoardPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
