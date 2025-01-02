// AvailableRoomsSection.tsx

import { AvailableRooms } from "../availableRooms";

export const AvailableRoomsSection: React.FC<any> = ({
  hotel,
  searchValue,
}) => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
      <AvailableRooms
        hotel={hotel}
        checkIn={searchValue.CheckIn}
        checkOut={searchValue.CheckOut}
        searchOption={searchValue}
      />
    </div>
  );
};
