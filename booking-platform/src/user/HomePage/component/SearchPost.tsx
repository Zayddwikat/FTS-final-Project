import Box from "@mui/material/Box";
import calculateDistance from "../../SearchPage/hooks/getDifference";
import getCurrentPositionAsync from "../../SearchPage/hooks/getLocation";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface PostObjectInformation {
  hotelId: number;
  cityName: string;
  description: string;
  roomPhotoUrl: string;
  hotelName: string;
  starRating: number;
  hotelStarRating: number;
  roomPrice: number;
  originalRoomPrice: number;
  finalPrice: number;
  latitude: number;
  longitude: number;
}

interface PostProps {
  post: PostObjectInformation;
  values: any;
}
export function onDateSub(CheckIn: string, CheckOut: string) {
  const date1 = new Date(CheckIn);
  const date2 = new Date(CheckOut);
  const differenceInMilliseconds = date2.getTime() - date1.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  console.log(`Difference: ${differenceInDays} days`);
  return differenceInDays;
}

export const Post: React.FC<PostProps> = ({ post, values }) => {
  const navigate = useNavigate();
  const handleClickedDeals = (post: PostObjectInformation) => {
    navigate(`/search-result/Hotels/${post.hotelId}`, {
      state: {
        post: post,
        searchValue: values,
      },
    });
  };
  console.log(values);
  console.table(post.hotelId);
  const positionQuery = useQuery({
    queryKey: ["position"],
    queryFn: getCurrentPositionAsync,
    enabled: false,
    staleTime: Infinity,
  });

  if (positionQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (positionQuery.error) {
    return <div>Error: Unable to fetch location</div>;
  }

  const [latitude, longitude] = positionQuery.data || [0, 0];
  const differentDays = onDateSub(values.CheckIn, values.CheckOut);
  console.log("the data is ", positionQuery.data);
  const distance = calculateDistance(
    latitude,
    longitude,
    post.latitude,
    post.longitude
  );

  return (
    <div
      onClick={() => handleClickedDeals(post)}
      className="border flex flex-row border-black  w-[90dvw] shadow hover:shadow-lg rounded-md lg:w-full md:w-full md:flex-wrap  "
    >
      <div className=" w-full  flex flex-row  h-[30dvh] ">
        <div className="lg:w-[40%] md:w-[50%] p-2 ">
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={post.roomPhotoUrl}
          />
        </div>

        <article className="flex flex-col w-full items-start  mx-2 my-4">
          <div className="flex flex-row items-center justify-between w-full ">
            <h2 className="text-xl text-bold">{post.hotelName}</h2>
            <div className="flex flex-row items-center gap-1">
              <p className="font-bold px-2 rounded-md">
                {post.starRating
                  ? post.starRating * 2 > 9.5
                    ? "Excellent"
                    : post.starRating * 2 > 8
                    ? "Very Good"
                    : post.starRating * 2 > 6
                    ? "Good"
                    : "Traditional"
                  : post.hotelStarRating * 2 > 9.5
                  ? "Excellent"
                  : post.hotelStarRating * 2 > 8
                  ? "Very Good"
                  : post.hotelStarRating * 2 > 6
                  ? "Good"
                  : "Traditional"}
              </p>
              <p className="text-md border text-white bg-blue-700 p-1 rounded-md">
                {post.starRating
                  ? post.starRating * 2
                  : post.hotelStarRating * 2}{" "}
              </p>{" "}
            </div>
          </div>

          <div className="flex flex-row items-center text-sm justify-start w-full space-x-2">
            <p className="text-sm">{post.cityName}</p>
            <p> {distance.toFixed(0) + " Km"}</p>
            <p className="text-xs">from you</p>
            <a
              href={`https://maps.google.com/?q=${post.latitude},${post.longitude}`}
            >
              map
            </a>
          </div>
          <div className="flex flex-col items-end justify-center gap-4 w-full">
            <Box sx={{ pt: 0.5 }}>
              <article className="text-xs flex border px-2 py-1 border-black rounded space-x-2">
                <p>{values.CheckIn}</p>
                <p>{values.CheckOut}</p>
              </article>
              <article className="text-xs flex justify-end space-x-1 ">
                <p>{differentDays + " Nights,"}</p>
                <p>{values.adult + " Adult,"}</p>
                {values.children !== 0 ? (
                  <p>{values.children + " Children"}</p>
                ) : (
                  ""
                )}
              </article>
              <div className="flex flex-row items-center gap-2">
                <p className="text-sm line-through line-clamp-2 text-blue-600 ">
                  <i className="text-xs"> 1 Night </i>{" "}
                  {post.roomPrice ? post.roomPrice : post.originalRoomPrice}
                </p>
                <p className="  text-lg bold-lg">
                  {" "}
                  <i>{"US$ "}</i>
                  <i>
                    {post.roomPrice
                      ? post.roomPrice * differentDays
                      : post.finalPrice * differentDays}
                  </i>
                </p>
              </div>
            </Box>
          </div>
        </article>
      </div>
    </div>
  );
};
