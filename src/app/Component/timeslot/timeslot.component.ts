import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { TimeSlotService } from "../../core/Services/timeslot.service";
import { QueryParams } from "../../core/Interfaces/QueryParams";
import { TimeSlot } from "../../core/Interfaces/TimeSlot";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

interface MonthGroup {
  month: string;
  slots: TimeSlot[];
}

@Component({
  selector: 'app-timeslot-list',
  imports: [
    MatCardModule, CommonModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeSlotComponent {

  params: QueryParams = {};
  timeSlots: TimeSlot[] = [];

  constructor(private service: TimeSlotService) { }

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

    const grouped = this.timeSlots.reduce((groups, slot) => {
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

    return Object.entries(grouped).map(([month, slots]) => ({
      month,
      slots
    }));
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

    return date.toLocaleDateString('en-IN', {
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
    switch (status) {
      case 1: return 'Active';
      case 0: return 'Inactive';
      case 2: return 'Pending';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'active';
      case 0: return 'inactive';
      case 2: return 'pending';
      default: return 'unknown';
    }
  }
}