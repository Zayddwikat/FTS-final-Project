import PostObjectInformation from "../../../data_module/postObjectInfo";

export const useGetReview = async ({
  post,
}: {
  post: PostObjectInformation;
}) => {
  console.log("inside the hotel");
  console.log("the id is ", post.hotelId);
  const data = await fetch(
    `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${post.hotelId}/reviews`,
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
