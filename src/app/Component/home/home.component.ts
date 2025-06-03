import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from '../../core/Services/auth.service';

@Component({
  selector: 'app-home',
  imports: [SideBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = "Welcome to the Home Page!";
  description = "This is a simple home component.";

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  logout() {
    const dialogRef = this.dialog.open(LogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.authService.logout();
      }
    });
  }
}
