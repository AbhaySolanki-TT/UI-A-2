import { Component } from '@angular/core';
import { GameZone, GameZoneStatus } from '../../core/Interfaces/GameZone';
import { Subject, takeUntil } from 'rxjs';
import { GameZoneService } from '../../core/Services/gamezone.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditGameZoneComponent } from './edit-game-zone/edit-game-zone.component';
import { QueryParams } from '../../core/Interfaces/QueryParams';
import { DeleteGameZoneComponent } from './delete-game-zone/delete-game-zone.component';

@Component({
  selector: 'app-game-zone',
  imports: [
    MatIconModule, MatPaginatorModule, MatMenuModule, NgIf, NgFor, NgClass,
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './game-zone.component.html',
  styleUrl: './game-zone.component.css'
})
export class GameZoneComponent {
  gameZones: GameZone[] = [];
  // filteredZones: GameZone[] = [];
  loading = false;
  totalZones = 0;
  selectedStatus: GameZoneStatus | '' = '';


  // Status options using enum
  statusOptions = [
    { value: GameZoneStatus.Available, label: 'Available' },
    { value: GameZoneStatus.Engaged, label: 'Engaged' },
    { value: GameZoneStatus.Maintenance, label: 'Maintenance' },
    { value: GameZoneStatus.Unknown, label: 'Unknown' }
  ];

  // Expose enum to template
  GameZoneStatus = GameZoneStatus;

  constructor(
    private gameZoneService: GameZoneService,
    private dialog: MatDialog,
    private service: GameZoneService,
  ) { }

  ngOnInit() {
    this.GetAll({});
    this.loadZoneCount();
  }

  loadZoneCount() {
    this.gameZoneService.count().subscribe((res) => {
      if (res.isSuccess) {
        this.totalZones = res.data!;
      }
    })
  }


  editZone(zone: GameZone | null) {
    const dialogRef = this.dialog.open(EditGameZoneComponent, {
      width: '90vw',
      maxHeight: '40vw',
      data: zone,
    });

    if (zone) {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.update(result).subscribe((res) => {
            if (res.isSuccess) {
              this.GetAll({});
            }
          });
        }
      })
    }

    else {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.create(result).subscribe((res) => {
            if (res.isSuccess) {
              this.GetAll({});
            }
          });
        }
      })
    }
  }

  deleteZone(zone: GameZone) {
    const dialogRef = this.dialog.open(DeleteGameZoneComponent, {
      width: '400px',
      maxHeight: '90vh',
      data: zone.name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(zone.id!).subscribe((res) => {
          if (res.isSuccess) {
            this.GetAll({});
          }
        })
      }
    })
  }

  GetAll(params: QueryParams | {}) {
    this.service.getAll(params).subscribe((res) => {
      if (res.isSuccess) {
        this.gameZones = res.data!;
        // this.filteredZones = [...this.gameZones];

        // console.log("Zones 0",this.gameZones[0]);
      }
    })
  }

  getZoneTypeClass(status: GameZoneStatus): string {
    switch (status) {
      case GameZoneStatus.Available: return 'zone-1';
      case GameZoneStatus.Engaged: return 'zone-2';
      case GameZoneStatus.Maintenance: return 'zone-3';
      case GameZoneStatus.Unknown: return 'zone-4';
      default: return 'zone-1';
    }
  }

  getStatusClass(status: GameZoneStatus): string {
    return GameZoneStatus[status] || 'Unknown';
  }

  getStatusLabel(status: GameZoneStatus): string {
    return GameZoneStatus[status] || 'Unknown';
  }
}
