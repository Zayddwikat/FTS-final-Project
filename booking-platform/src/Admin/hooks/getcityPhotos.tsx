export const getCityPhotos = (cityId: number) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  const data = fetch(
    `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities/${cityId}/photos`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => new Error("Error in fetching images", err));
  return data;
};
