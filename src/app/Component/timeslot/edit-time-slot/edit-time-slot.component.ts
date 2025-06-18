import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameZone } from '../../../core/Interfaces/GameZone';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimeSlot } from '../../../core/Interfaces/TimeSlot';
import { GameZoneService } from '../../../core/Services/gamezone.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { ValidationErrorComponent } from "../../validation-error/validation-error.component";
import { MatTimepickerModule } from '@angular/material/timepicker';
import { endTimeValidator } from '../../../core/Validators/endTimeValidator';

@Component({
  selector: 'app-edit-time-slot',
  imports: [
    NgFor, NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    ValidationErrorComponent,
    MatDatepickerModule,
    MatTimepickerModule,
  ],
  templateUrl: './edit-time-slot.component.html',
  styleUrl: './edit-time-slot.component.css'
})
export class EditTimeSlotComponent {
  timeSlotForm: FormGroup;
  gameZones: GameZone[] = [];

  startTime: any = {
    startTime: "08:00",
    startMinTime: "08:00",
    startMaxTime: "20:00",
  }

  endTime: any = {
    endTime: "20:00",
    endMinTime: "08:00",
    endMaxTime: "22:00",
  }


  constructor(
    private fb: FormBuilder,
    private gameZoneService: GameZoneService,
    private dialogRef: MatDialogRef<EditTimeSlotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeSlot | null
  ) {
    // console.log("id", data?.id);
    this.timeSlotForm = this.fb.group({
      id: [data?.id || null],
      gameZoneId: [data?.gameZoneId || null, [Validators.required]],
      bookingDate: [this.toDateOnly(data?.bookingDate || new Date()), [Validators.required]],
      startTime: [this.toTime(data?.startTime || ''), [Validators.required, endTimeValidator]],
      endTime: [this.toTime(data?.endTime || ''), [Validators.required]],
      notes: [data?.notes || '', [Validators.maxLength(500)]],
    }, {
      validators: [endTimeValidator]
    });
  }

  ngOnInit() {
    // console.log(this.timeSlotForm.value.id);
    this.loadGameZones();

    this.timeSlotForm
  }

  save() {
    if (this.timeSlotForm.valid) {
      const formValue = this.timeSlotForm.value;

      const payload = {
        ...formValue,
        bookingDate: this.toDateOnly(formValue.bookingDate),
        startTime: this.extractTime(formValue.startTime),
        endTime: this.extractTime(formValue.endTime),
      }

      this.dialogRef.close(payload);
    } else {
      this.timeSlotForm.markAllAsTouched();
    }
  }

  extractTime(value: any): string {
    const date = new Date(value);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = '00';
    return `${hours}:${minutes}:${seconds}`;
  }

  toTime(time: string): Date {
    const [h, m, s] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, s || 0, 0);
    return date;
  }

  cancel() {
    this.dialogRef.close(false);
  }

  private toDateOnly(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  private loadGameZones() {
    this.gameZoneService.getAll({}).subscribe((res) => {
      if (res.isSuccess) {
        this.gameZones = res.data!;
      }
    });
  }
}
