import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReserveLibComponent } from './show-reserve-lib.component';

describe('ShowReserveLibComponent', () => {
  let component: ShowReserveLibComponent;
  let fixture: ComponentFixture<ShowReserveLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReserveLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowReserveLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
