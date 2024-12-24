import { Box } from "@mui/material";
import { recentHotelsInformation } from "../../../classes/recentHotelsPost";

interface RecentViewedProps {
  post: recentHotelsInformation;
}

export const RecentViewedPost: React.FC<RecentViewedProps> = ({ post }) => {
  console.log(post.hotelName);
  return (
    <div className="border border-black w-[90dvw] shadow hover:shadow-lg rounded-md lg:w-[17dvw] md:w-full md:flex-wrap">
      <div className="w-full md:flex-wrap h-[60dvh] ">
        <img
          style={{
            width: "100%",
            height: "68%",
            objectFit: "cover",
          }}
          src={post.thumbnailUrl}
        />
        <article className="flex flex-col  items-start  mx-2 my-1">
          <Box sx={{ pt: 0.5 }}>
            <h2 className="text-xl text-bold">{post.hotelName}</h2>
            <p className="text-sm">{post.cityName}</p>
          </Box>
          <div className="flex flex-row items-center justify-start w-full">
            <p className="text-md border text-white bg-blue-700 p-0.5 rounded-md">
              {post.starRating * 2}
            </p>
            <p className="text-sm  px-2 rounded-md">
              {post.starRating * 2 > 9.5
                ? "Excellent"
                : post.starRating * 2 > 8
                ? "Very Good"
                : post.starRating * 2 > 6
                ? "Good"
                : "Traditional"}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-4 w-full">
            <div className="flex flex-col items-center justify-between ">
              <p className=" flex flex-row line-clamp-2 gap-2">
                <i> Lower Price: </i>
                <p className="text-blue-500">
                  {post.priceLowerBound} <i>{"US$ "}</i>
                </p>
              </p>
              <p className="flex flex-row line-clamp-2 gap-2">
                <i> Upper Price </i>
                <i>
                  {post.priceUpperBound}
                  <i>{" US$ "}</i>
                </i>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
