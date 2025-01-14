import { Box } from "@mui/material";
import { recentHotelsInformation } from "../../../../data_models/recentHotelsPost";
interface RecentViewedProps {
  post: recentHotelsInformation;
}

const RatingBadge = ({ rating }: { rating: number }) => {
  const ratingText =
    rating > 9.5
      ? "Excellent"
      : rating > 8
      ? "Very Good"
      : rating > 6
      ? "Good"
      : "Traditional";

  return (
    <div className="flex flex-row items-center justify-start w-full my-2">
      <p className="text-md border text-white bg-blue-700 p-0.5 rounded-md">
        {rating * 2}
      </p>
      <p className="text-sm px-2 rounded-md">{ratingText}</p>
    </div>
  );
};

const PriceRange = ({
  lowerPrice,
  upperPrice,
}: {
  lowerPrice: number;
  upperPrice: number;
}) => (
  <div className="flex flex-col gap-2 w-full">
    <div className="flex flex-row items-center justify-start gap-2">
      <i className="text-sm">Lower Price:</i>
      <p className="text-blue-500 text-sm">
        {lowerPrice} <i>US$</i>
      </p>
    </div>
    <div className="flex flex-row items-center justify-start gap-2">
      <i className="text-sm">Upper Price:</i>
      <p className="text-blue-500 text-sm">
        {upperPrice} <i>US$</i>
      </p>
    </div>
  </div>
);

export const RecentViewedPost: React.FC<RecentViewedProps> = ({ post }) => {
  const {
    hotelName,
    cityName,
    starRating,
    thumbnailUrl,
    priceLowerBound,
    priceUpperBound,
  } = post;

  return (
    <div className="border shadow hover:shadow-lg rounded-md w-full mb-4">
      <div className="w-full h-40 sm:h-48 lg:h-60 relative">
        <img
          className="w-full h-full object-cover rounded-t-md"
          src={thumbnailUrl}
          alt={hotelName}
        />
      </div>

      <article className="flex flex-col items-start p-4">
        <Box>
          <h2 className="text-lg font-semibold">{hotelName}</h2>
          <p className="text-sm text-gray-500">{cityName}</p>
        </Box>

        <RatingBadge rating={starRating} />
        <PriceRange lowerPrice={priceLowerBound} upperPrice={priceUpperBound} />
      </article>
    </div>
  );
};
export default RecentViewedPost
