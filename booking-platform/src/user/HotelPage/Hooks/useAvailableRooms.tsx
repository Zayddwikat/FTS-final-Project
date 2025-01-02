export const useGetAvailableRooms = async ({ hotel, checkIn, checkOut }) => {
  console.log(hotel, checkIn, checkOut);
  const str = `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${
    hotel.hotelId ?? hotel.id
  }/available-rooms?checkInDate=${checkIn
    .split("-")
    .reverse()
    .join("-")}&CheckOutDate=${checkOut.split("-").reverse().join("-")}`;
  console.log(str);
  const data = await fetch(str, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => await res.json())
    .catch((err) => new Error("Error in fetching Data ", err));
  console.log(data);
  return data;
};
