// import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { LogoutComponent } from '../logout/logout.component';
// import { AuthService } from '../../core/Services/auth.service';

// @Component({
//   selector: 'app-side-bar',
//   templateUrl: './side-bar.component.html',
//   styleUrl: './side-bar.component.css'
// })
// export class SideBarComponent {
//   isOpen = true;

//   constructor(private dialog: MatDialog, private authService: AuthService) {}

//   toggleSidebar() {
//     this.isOpen = !this.isOpen;
//   }

//   onLogOut() {
//     const dialogRef = this.dialog.open(LogoutComponent);

//     dialogRef.afterClosed().subscribe(result => {
//       if (result === true) {
//         this.authService.logout();
//       }
//     });
//   }
// }

import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from '../../core/Services/auth.service';
import { NgIf } from '@angular/common';
import { UserInfo } from '../../core/Interfaces/UserInfo';
import { JwtService } from '../../core/Services/jwt.service';

// interface NavigationItem {
//   icon: string;
//   text: string;
//   route: string;
//   active?: boolean;
// }

// interface PageData {
//   title: string;
//   description: string;
// }

@Component({
  selector: 'app-side-bar',
  imports: [NgIf],
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
    this.userInfo.name = userName !== null ? userName : '';

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

  get overlayClasses(): string {
    return this.isOpen ? 'sidebar-overlay active' : 'sidebar-overlay';
  }
}