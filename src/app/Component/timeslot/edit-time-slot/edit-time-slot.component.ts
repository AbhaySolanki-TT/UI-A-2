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
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ValidationErrorComponent } from "../../validation-error/validation-error.component";
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-edit-time-slot',
  imports: [
    NgFor, NgIf, DatePipe,
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
    this.timeSlotForm = this.fb.group({
      id: [data?.id || null],
      gameZoneId: [data?.gameZoneId || null, [Validators.required]],
      bookingDate: [data?.bookingDate, [Validators.required]],
      startTime: [new Date(`${data?.bookingDate}T${data?.startTime}`), [Validators.required]],
      endTime: [new Date(`${data?.bookingDate}T${data?.endTime}`), [Validators.required]],
      notes: [data?.notes || '', [Validators.maxLength(500)]],
    });
  }

  ngOnInit() {
    this.loadGameZones();

    console.log('Booking Date', this.data?.bookingDate)
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

  private extractTime(value: any): string {
    const date = new Date(value);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  private toDateOnly(date: string | Date): string {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = d.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  cancel() {
    this.dialogRef.close(false);
  }

  private loadGameZones() {
    this.gameZoneService.getAll({}).subscribe((res) => {
      if (res.isSuccess) {
        this.gameZones = res.data!;
      }
    });
  }
}
