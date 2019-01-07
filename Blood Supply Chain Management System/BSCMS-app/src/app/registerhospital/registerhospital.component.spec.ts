import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterhospitalComponent } from './registerhospital.component';

describe('RegisterhospitalComponent', () => {
  let component: RegisterhospitalComponent;
  let fixture: ComponentFixture<RegisterhospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterhospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterhospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
