import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-game-zone',
  imports: [],
  templateUrl: './delete-game-zone.component.html',
  styleUrl: './delete-game-zone.component.css'
})
export class DeleteGameZoneComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteGameZoneComponent>,
    @Inject(MAT_DIALOG_DATA) public ZoneName: string
  ) {
  }

  confirmDelete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
