import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReserveComponent } from './delete-reserve.component';

describe('DeleteReserveComponent', () => {
  let component: DeleteReserveComponent;
  let fixture: ComponentFixture<DeleteReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReserveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
