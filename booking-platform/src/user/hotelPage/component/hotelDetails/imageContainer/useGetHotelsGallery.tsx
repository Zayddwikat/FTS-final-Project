import PostObjectInformation from "../../../../../data_models/postObjectInfo";

export const getHotelGallery = async ({
  post,
}: {
  post: PostObjectInformation;
}) => {
  console.log("inside the hotel");
  console.log("the id is ", post.hotelId);
  const data = await fetch(
    `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${post.hotelId}/gallery`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (res) => await res.json())
    .catch((err) => new Error("Error in fetching Data ", err));
  return data;
};
