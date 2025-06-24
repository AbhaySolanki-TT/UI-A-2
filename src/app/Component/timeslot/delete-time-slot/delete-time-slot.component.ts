import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-time-slot',
  imports: [
    MatDialogModule
  ],
  templateUrl: './delete-time-slot.component.html',
  styleUrls: ['./delete-time-slot.component.css']
})
export class DeleteTimeSlotComponent {

  formattedTime: string;
  
  constructor(
    private dialogRef: MatDialogRef<DeleteTimeSlotComponent>,
    @Inject(MAT_DIALOG_DATA) public startTime: string
  ) {
    this.formattedTime = this.formatTime(startTime);
  }

  confirmDelete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  private formatTime(time: string): string {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds || 0);

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}
