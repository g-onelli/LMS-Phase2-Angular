import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOpenComponent } from './show-open.component';

describe('ShowOpenComponent', () => {
  let component: ShowOpenComponent;
  let fixture: ComponentFixture<ShowOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
