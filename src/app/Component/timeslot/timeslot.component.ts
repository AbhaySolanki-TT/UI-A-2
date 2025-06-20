import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { TimeSlotService } from "../../core/Services/timeslot.service";
import { QueryParams } from "../../core/Interfaces/QueryParams";
import { TimeSlot } from "../../core/Interfaces/TimeSlot";
import { CommonModule, DatePipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { GameZoneStatus } from "../../core/Interfaces/GameZone";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialog } from "@angular/material/dialog";
import { EditTimeSlotComponent } from "./edit-time-slot/edit-time-slot.component";
import { DeleteTimeSlotComponent } from "./delete-time-slot/delete-time-slot.component";

interface MonthGroup {
  month: string;
  slots: TimeSlot[];
}

@Component({
  selector: 'app-timeslot-list',
  imports: [
    MatCardModule, CommonModule,
     MatButtonModule, MatIconModule, 
     MatMenuModule,
  ],
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeSlotComponent {

  params: QueryParams = {};
  timeSlots: TimeSlot[] = [];

  constructor(private service: TimeSlotService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAll(this.params);
  }

  getAll(params: QueryParams) {
    this.service.getAll(params).subscribe((res) => {
      if (res.isSuccess) {
        this.timeSlots = res.data!;
      }
    })
  }

  getGroupedTimeSlots(): MonthGroup[] {
    // Step 1: Sort all time slots by bookingDate (latest first)
    const sortedSlots = [...this.timeSlots].sort((a, b) => {
      return new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime();
    });

    // Step 2: Group sorted slots by Month-Year
    const grouped = sortedSlots.reduce((groups, slot) => {
      const date = new Date(slot.bookingDate);
      const monthYear = date.toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric'
      }).toUpperCase();

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }

      groups[monthYear].push(slot);
      return groups;
    }, {} as { [key: string]: TimeSlot[] });

    // Step 3: Convert to array and sort months descending
    return Object.entries(grouped)
      .map(([month, slots]) => ({ month, slots }))
      .sort((a, b) => {
        // Convert month-year strings to dates for comparison
        const dateA = new Date(`1 ${a.month}`);
        const dateB = new Date(`1 ${b.month}`);
        return dateB.getTime() - dateA.getTime(); // Latest first
      });
  }

  onEdit(slot: TimeSlot | null) {
    const dialogRef = this.dialog.open(EditTimeSlotComponent, {
      width: '90vw',
      maxHeight: '40vw',
      data: slot,
    });

    if (slot) {
      // console.log("slot",slot)
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.update(result).subscribe((res) => {
            // console.log(result);
            if (res.isSuccess) {
              this.getAll(this.params);
            }
          });
        }
      })
    }

    else {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.register(result).subscribe((res) => {
            if (res.isSuccess) {
              this.getAll(this.params);
            }
          });
        }
      })
    }
  }

  onCancel(id: number, startTime: string) {
    const dialogRef = this.dialog.open(DeleteTimeSlotComponent, {
      width: '400px',
      maxHeight: '90vh',
      data: startTime
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(id).subscribe((res) => {
          if (res.isSuccess) { this.getAll(this.params) }
        })
      }
    })
  }

  getCardClass(slot: TimeSlot): string {
    return `zone-${slot.gameZoneId}`;
  }

  getFormattedDate(dateString: string) {

    const date = new Date(dateString);

    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  getFormattedTime(timeString: string): string {

    const [hours, minutes] = timeString.split(':');

    const date = new Date();

    date.setHours(parseInt(hours), parseInt(minutes));

    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  getFormattedDuration(slot: TimeSlot): string {
    const start = new Date(`2000-01-01T${slot.startTime}`);
    const end = new Date(`2000-01-01T${slot.endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins >= 60) {
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    return `${diffMins} mins`;
  }

  getStatusText(status: number): string {
    return GameZoneStatus[status]
  }
}