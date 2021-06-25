import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectsMenuComponent } from './projects-menu.component';

describe('ProjectsMenuComponent', () => {
  let component: ProjectsMenuComponent;
  let fixture: ComponentFixture<ProjectsMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
