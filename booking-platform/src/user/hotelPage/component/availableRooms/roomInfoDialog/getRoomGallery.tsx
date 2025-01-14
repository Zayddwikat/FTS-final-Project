export const getRoomGallery = async (roomId: number) => {
  const data = await fetch(
    `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/rooms/${roomId}/photos`
  )
    .then((res) => res.json())
    .catch((error) => new Error("Error in fetching data", error));
  return data;
};
