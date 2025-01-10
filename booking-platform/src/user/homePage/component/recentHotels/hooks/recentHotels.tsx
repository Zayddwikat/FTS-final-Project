export const recentHotels = async (userId: number) => {
  const token = localStorage.getItem("USER_TOKEN");
  console.log(token);
  const response = await fetch(
    `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/users/${userId}/recent-hotels`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Booking failed! ${errorMessage}`);
  }

  const data = await response.json();
  return data;
};
