import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-role',
  imports: [MatDialogModule ],
  templateUrl: './delete-role.component.html',
  styleUrl: './delete-role.component.css'
})
export class DeleteRoleComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public name: string,
  ) { }

  onDelete() { this.dialogRef.close(true); }
  onCancel() { this.dialogRef.close(false); }
}
