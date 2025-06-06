
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from '../../core/Services/auth.service';
import { NgIf } from '@angular/common';
import { UserInfo } from '../../core/Interfaces/UserInfo';
import { JwtService } from '../../core/Services/jwt.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-side-bar',
  imports: [
    NgIf,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
  isOpen = true;
  userInfo: UserInfo = {} as UserInfo;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
  ) { }

  ngOnInit() {
    const userName = this.jwtService.getUserName();
    const [first,last] = userName !== null ? userName.split(" ") : ['', ''];

    this.userInfo.firstName = first.trim();
    this.userInfo.lastName = last.trim();

    const role = this.jwtService.getRole();
    this.userInfo.roleName = role !== null ? role : '';
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }


  onLogOut() {
    const dialogRef = this.dialog.open(LogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.authService.logout();
      }
    });
  }

  get sidebarClasses(): string {
    let classes = 'sidebar';
    if (!this.isOpen) {
      classes += ' closed';
    }
    if (this.isOpen) {
      classes += ' open';
    }
    return classes;
  }
}