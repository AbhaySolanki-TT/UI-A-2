import { Component } from '@angular/core';
import { QueryParams } from '../../core/Interfaces/QueryParams';
import { UserInfo } from '../../core/Interfaces/UserInfo';
import { UserService } from '../../core/Services/user.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  imports: [DatePipe, NgIf, NgFor,MatIconModule,MatButtonModule,MatDialogModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  queryParams: QueryParams = {} as QueryParams;
  users: UserInfo[] = [];

  constructor(private service: UserService, private dialog: MatDialog ) { }

  ngOnInit() {
    this.GetAll();
  }

  EditDialog(user: UserInfo){
    const dialogRef = this.dialog.open(EditUserComponent,{
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.GetAll();
    })
  }

  GetAll(){
    this.service.GetAll(this.queryParams).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.users = res.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
