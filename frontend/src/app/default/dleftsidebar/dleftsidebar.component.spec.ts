import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DleftsidebarComponent } from './dleftsidebar.component';

describe('DleftsidebarComponent', () => {
  let component: DleftsidebarComponent;
  let fixture: ComponentFixture<DleftsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DleftsidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DleftsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
