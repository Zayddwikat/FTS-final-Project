
export const searchResult = async (params: any) => {
  const queryParams = new URLSearchParams({
    checkInDate: params.checkIn,
    checkOutDate: params.checkOut,
    starRate: params.starRate?.toString() ?? "",
    city: params.city,
    numberOfRooms: params.numOfRooms?.toString() ?? "",
    children: params.childrenWithAdults?.toString() ?? "",
    adults: params.adults?.toString() ?? "",
  });

  const res = await fetch(
    `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/search?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (res) => await res.json())
    .catch((err) => new Error("Error in fetching Data ", err));
  console.log("res is : ", res);
  return res;
};
