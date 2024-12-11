import { roomAmenities } from "./roomAmenities";

export interface roomInformation {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities: Array<roomAmenities>;
  price: number;
  availability: boolean;
}
