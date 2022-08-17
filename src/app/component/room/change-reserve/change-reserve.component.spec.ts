import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeReserveComponent } from './change-reserve.component';

describe('ChangeReserveComponent', () => {
  let component: ChangeReserveComponent;
  let fixture: ComponentFixture<ChangeReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeReserveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
