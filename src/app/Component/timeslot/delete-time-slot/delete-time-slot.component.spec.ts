import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTimeSlotComponent } from './delete-time-slot.component';

describe('DeleteTimeSlotComponent', () => {
  let component: DeleteTimeSlotComponent;
  let fixture: ComponentFixture<DeleteTimeSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTimeSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
