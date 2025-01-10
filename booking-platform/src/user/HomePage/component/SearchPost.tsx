import Box from "@mui/material/Box";
import calculateDistance from "../../searchPage/hooks/getDifference";
import getCurrentPositionAsync from "../../searchPage/hooks/getLocation";
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
  return differenceInDays;
}

const calculatePrice = (
  roomPrice: number,
  finalPrice: number,
  nights: number
) => {
  return roomPrice ? roomPrice * nights : finalPrice * nights;
};

const formatRating = (rating: number) => {
  if (rating * 2 > 9.5) return "Excellent";
  if (rating * 2 > 8) return "Very Good";
  if (rating * 2 > 6) return "Good";
  return "Traditional";
};

const calculateDaysDifference = (CheckIn: string, CheckOut: string) => {
  const date1 = new Date(CheckIn);
  const date2 = new Date(CheckOut);
  const differenceInMilliseconds = date2.getTime() - date1.getTime();
  return differenceInMilliseconds / (1000 * 60 * 60 * 24);
};

export const Post: React.FC<PostProps> = ({ post, values }) => {
  const navigate = useNavigate();
  const { CheckIn, CheckOut, adult, children } = values;

  const handleClickedDeals = () => {
    navigate(`/search-result/Hotels/${post.hotelId}`, {
      state: { post, searchValue: values },
    });
  };

  const positionQuery = useQuery({
    queryKey: ["position"],
    queryFn: getCurrentPositionAsync,
    enabled: false,
    staleTime: Infinity,
  });

  if (positionQuery.isLoading) return <div>Loading...</div>;
  if (positionQuery.error) return <div>Error: Unable to fetch location</div>;

  const [latitude, longitude] = positionQuery.data || [0, 0];
  const daysDifference = calculateDaysDifference(CheckIn, CheckOut);
  const distance = calculateDistance(
    latitude,
    longitude,
    post.latitude,
    post.longitude
  );
  const price = calculatePrice(post.roomPrice, post.finalPrice, daysDifference);

  return (
    <div
      onClick={handleClickedDeals}
      className="border flex flex-col lg:h-[35dvh] md:h-[40dvh] md:flex-row border-black w-full shadow hover:shadow-lg rounded-md p-2"
    >
      <div className="w-full  md:w-1/2 p-2">
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={post.roomPhotoUrl}
          alt={`${post.hotelName} room`}
        />
      </div>

      <article className="flex flex-col w-full md:w-1/2 items-start md:items-start md:mx-4 my-4">
        <div className="flex flex-row items-center justify-between w-full mb-2">
          <h2 className="text-xl font-bold">{post.hotelName}</h2>
          <div className="flex flex-row items-center gap-2">
            <p className="font-bold px-2 rounded-md text-sm">
              {formatRating(post.starRating || post.hotelStarRating)}
            </p>
            <p className="text-md border text-white bg-blue-700 p-1 rounded-md">
              {post.starRating ? post.starRating * 2 : post.hotelStarRating * 2}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center text-sm justify-start w-full space-x-2 mb-2">
          <p className="text-sm">{post.cityName}</p>
          <p>{distance.toFixed(0)} Km</p>
          <p className="text-xs">from you</p>
          <a
            href={`https://maps.google.com/?q=${post.latitude},${post.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            map
          </a>
        </div>

        <div className="flex flex-col items-end justify-center gap-4 w-full">
          <Box sx={{ pt: 0.5 }}>
            <article className="text-xs flex border px-2 py-1 border-black rounded space-x-2 mb-2">
              <p>{CheckIn}</p>
              <p>{CheckOut}</p>
            </article>
            <article className="text-xs flex justify-end space-x-1">
              <p>{`${daysDifference} Nights,`}</p>
              <p>{`${adult} Adult,`}</p>
              {children !== 0 && <p>{`${children} Children`}</p>}
            </article>
            <div className="flex flex-row items-center gap-2">
              <p className="text-sm line-through text-blue-600">
                <i className="text-xs"> 1 Night </i>
                {post.roomPrice || post.originalRoomPrice}
              </p>
              <p className="text-lg font-bold">
                <i>US$ </i>
                <i>{price}</i>
              </p>
            </div>
          </Box>
        </div>
      </article>
    </div>
  );
};
