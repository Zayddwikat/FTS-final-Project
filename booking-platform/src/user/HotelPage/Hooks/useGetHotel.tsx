export const useHotel = async (hotelId: number) => {
  console.log("hotelId is ", hotelId);

  const data = await fetch(
    `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${hotelId}?includeRooms=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (res) => await res.json())
    .catch((err) => new Error("Error in fetching Data ", err));
  console.table("the data is : ", data);
  return data;
};
