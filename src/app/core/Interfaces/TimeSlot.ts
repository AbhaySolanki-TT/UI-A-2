export interface TimeSlot {
  id: number;
  gameZoneId: number;
  bookingDate: string;   // ISO format date: "YYYY-MM-DD"
  startTime: string;     // ISO format time: "HH:mm:ss"
  endTime: string;       // ISO format time: "HH:mm:ss"
  status: TimeSlotStatus;
  notes?: string;
  createdAt?: string;
  createdBy?: number;
  updatedAt?: string;
  updatedBy?: number;
}

export enum TimeSlotStatus {
  Available = 0,
  Booked = 1,
  Unavailable = 2
}
