import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { QueryParams } from '../../core/Interfaces/QueryParams';
import { RoleService } from '../../core/Services/role.service';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { DeleteRoleComponent } from './delete-role/delete-role.component';
import { Role } from '../../core/Interfaces/Role';

@Component({
  selector: 'app-roles',
  imports: [
    NgFor, NgIf,
    MatIconModule, MatButtonModule, MatDialogModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  queryParams: QueryParams = {} as QueryParams;
  roles: Role[] = [];

  constructor(private service: RoleService, private dialog: MatDialog) { }

  ngOnInit() {
    this.GetAll();
  }

  EditDialog(role: Role | null) {
    const dialogRef = this.dialog.open(EditRoleComponent, {
      width: '35vw',
      height: '45vh',
      data: role
    });

    if (role) {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.Update(result).subscribe((res) => {
            if (res.isSuccess) {
              this.GetAll();
            }
          });
        }
      })
    }

    else {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.Create(result).subscribe((res) => {
            if (res.isSuccess) {
              this.GetAll();
            }
          });
        }
      })
    }
  }

  DeleteDialog(role: Role) {

    const dialogRef = this.dialog.open(DeleteRoleComponent, {
      width: '35vw',
      maxHeight: '45vh',
      data: role.name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.Delete(role.id).subscribe((res) => {
          if (res.isSuccess) { this.GetAll() }
        })
      }
    })
  }

  GetAll() {
    this.service.GetAll(this.queryParams).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.roles = res.data;

        }
      },
      error: (error) => {
        console.log(error);
      }
    });

  }
}