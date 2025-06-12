import { Component } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from '../../core/Services/auth.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [SideBarComponent, RouterOutlet,MatIconModule,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = "Welcome to the GAME ZONE!";

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
