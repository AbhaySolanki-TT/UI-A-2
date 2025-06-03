// import { Component, inject } from '@angular/core';
// import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-logout',
//   standalone: true,
//   imports: [MatDialogModule],
//   templateUrl: './logout.component.html',
//   styleUrl: './logout.component.css'
// })
// export class LogoutComponent {
//   constructor(public dialogRef: MatDialogRef<LogoutComponent>) {}
// }


import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(public dialogRef: MatDialogRef<LogoutComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onLogout(): void {
    this.dialogRef.close(true);
  }
}