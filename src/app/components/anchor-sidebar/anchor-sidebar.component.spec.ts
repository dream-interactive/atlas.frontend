import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorSidebarComponent } from './anchor-sidebar.component';

describe('AnchorSidebarComponent', () => {
  let component: AnchorSidebarComponent;
  let fixture: ComponentFixture<AnchorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnchorSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
