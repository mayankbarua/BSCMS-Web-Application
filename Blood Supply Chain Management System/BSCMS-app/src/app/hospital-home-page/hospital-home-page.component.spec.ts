import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalHomePageComponent } from './hospital-home-page.component';

describe('HospitalHomePageComponent', () => {
  let component: HospitalHomePageComponent;
  let fixture: ComponentFixture<HospitalHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
