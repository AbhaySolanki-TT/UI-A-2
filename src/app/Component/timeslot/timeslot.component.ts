import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { TimeSlot, TimeSlotStatus } from '../../core/Interfaces/TimeSlot';
import { TimeSlotService } from '../../core/Services/timeslot.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { EditTimeSlotComponent } from './edit-time-slot/edit-time-slot.component';
import { DeleteTimeSlotComponent } from './delete-time-slot/delete-time-slot.component';


@Component({
  selector: 'app-timeslot-list',
  imports: [
    NgIf, NgFor, CommonModule, MatCardModule, MatChipsModule, MatIconModule
  ],
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeSlotComponent implements OnInit {
  timeSlots: TimeSlot[] = [];
  groupedTimeSlots: { [weekKey: string]: TimeSlot[] } = {};

  constructor(
    private timeSlotService: TimeSlotService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTimeSlots();
  }

  loadTimeSlots(): void {
    const params = { page: 1, pageSize: 100 };
    this.timeSlotService.getAll(params).subscribe(response => {
      if (response.isSuccess) {
        this.timeSlots = response.data!;
        this.groupTimeSlotsByWeek();
      }
    });
  }

  groupTimeSlotsByWeek() {
    const groups: { [weekKey: string]: TimeSlot[] } = {};

    for (const slot of this.timeSlots) {
      const date = moment(slot.bookingDate);
      const weekKey = `${date.year()}-W${date.isoWeek()}`;

      if (!groups[weekKey]) {
        groups[weekKey] = [];
      }

      groups[weekKey].push(slot);
    }

    this.groupedTimeSlots = groups;
  }


  sortByWeek = (a: { key: string }, b: { key: string }) => {
    return a.key.localeCompare(b.key);
  };


  formatWeekRange(weekKey: string): string {
    const [year, week] = weekKey.split('-W');
    const start = moment().year(+year).isoWeek(+week).startOf('isoWeek');
    const end = start.clone().endOf('isoWeek');
    return `${start.format('MMM D')} - ${end.format('MMM D, YYYY')}`;
  }

  getStatusColor(status: TimeSlotStatus): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case TimeSlotStatus.Available: return 'primary';
      case TimeSlotStatus.Booked: return 'accent';
      case TimeSlotStatus.Unavailable: return 'warn';
      default: return 'primary';
    }
  }

  reserve(slot: TimeSlot): void {
    if (slot.status !== TimeSlotStatus.Available) return;
    const payload = { id: slot.id, gameZoneId: slot.gameZoneId };

    this.timeSlotService.register(payload).subscribe(res => {
      if (res.isSuccess) {
        slot.status = TimeSlotStatus.Booked;
      }
    });
  }

  editSlot(slot: TimeSlot): void {
    const dialogRef = this.dialog.open(EditTimeSlotComponent, {
      width: '500px',
      data: { slot }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTimeSlots();
      }
    });
  }

  deleteSlot(id: number): void {
    const confirmRef = this.dialog.open(DeleteTimeSlotComponent, {
      data: {
        title: 'Delete Timeslot',
        message: 'Are you sure you want to delete this timeslot?'
      }
    });

    confirmRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.timeSlotService.delete(id).subscribe(res => {
          if (res.isSuccess) {
            this.loadTimeSlots();
          }
        });
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(EditTimeSlotComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTimeSlots();
      }
    });
  }
}
