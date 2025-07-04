import { Component } from '@angular/core';
import { GameZoneService } from '../../core/Services/gamezone.service';
import { GameZone } from '../../core/Interfaces/GameZone';
import { MatIconModule } from '@angular/material/icon';
import { GalleryItem, GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';

@Component({
  selector: 'app-game-zone-profile',
  imports: [MatIconModule],
  templateUrl: './game-zone-profile.component.html',
  styleUrl: './game-zone-profile.component.css'
})
export class GameZoneProfileComponent {
  gameZone?: GameZone | null;
  galleryImages: GalleryItem[] = [];

  constructor(private service: GameZoneService) {
    this.loadGameZone();
  }

  loadGameZone() {
    this.service.getById(1).subscribe((res) => {
      if(res.isSuccess){
        this.gameZone = res.data;
      }
    });
  }
}
  