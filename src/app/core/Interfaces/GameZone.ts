export interface GameZone {
  id?: number;
  name: string;
  description: string;
  maxPlayers: number;
  minPlayers: number;
  status: GameZoneStatus;
}

export enum GameZoneStatus {
  Unknown = 0,
  Available = 1,
  Engaged = 2,
  Maintenance = 3
}
