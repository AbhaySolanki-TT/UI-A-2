import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameZoneComponent } from './game-zone.component';

describe('GameZoneComponent', () => {
  let component: GameZoneComponent;
  let fixture: ComponentFixture<GameZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
