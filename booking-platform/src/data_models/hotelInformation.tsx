import { roomAmenities } from "./roomAmenities";

export interface hotelInformation {
  hotelId: number;
  hotelName: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  amenities: Array<roomAmenities>;
  starRating: number;
  availableRooms: number;
  imageUrl: string;
  cityId: number;
}
