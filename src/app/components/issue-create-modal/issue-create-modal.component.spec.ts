import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCreateModalComponent } from './issue-create-modal.component';

describe('IssueCreateModalComponent', () => {
  let component: IssueCreateModalComponent;
  let fixture: ComponentFixture<IssueCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueCreateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
