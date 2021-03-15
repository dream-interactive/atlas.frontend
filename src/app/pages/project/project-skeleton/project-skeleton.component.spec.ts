import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSkeletonComponent } from './project-skeleton.component';

describe('ProjectSkeletonComponent', () => {
  let component: ProjectSkeletonComponent;
  let fixture: ComponentFixture<ProjectSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
