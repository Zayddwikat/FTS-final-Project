import PropTypes from "prop-types";
import Box from "@mui/material/Box";

export default function Post({ post }) {
  const handleClickedDeals = (post) => {
    console.log("clicked", post.cityName);
  };
  return (
    <div
      onClick={() => handleClickedDeals(post)}
      className="border  border-black shadow hover:shadow-black rounded-md lg:w-[18dvw] md:w-[70dvw] md:flex-wrap  "
    >
      <div className=" w-full  md:flex-wrap h-[50dvh] ">
        <img
          style={{
            width: "100%",
            height: "68%",
            objectFit: "cover",
          }}
          src={post.roomPhotoUrl}
        />
        <article className="flex flex-col  items-start  mx-2 my-1">
          <Box sx={{ pt: 0.5 }}>
            <h2 className="text-xl text-bold">{post.hotelName}</h2>
            <p className="text-sm">{post.cityName}</p>
          </Box>
          <div className="flex flex-row items-center justify-start w-full">
            <p className="text-md border text-white bg-orange-700 p-0.5 rounded-md">
              {post.hotelStarRating * 2} /10
            </p>
            <p className="text-sm  px-2 rounded-md">
              {post.hotelStarRating * 2 > 9.5
                ? "Excellent"
                : post.hotelStarRating * 2 > 8
                ? "Very Good"
                : post.hotelStarRating * 2 > 6
                ? "Good"
                : "Traditional"}
            </p>
          </div>
          <div className="flex flex-row items-center justify-end gap-4 w-full">
            <div className="flex flex-row items-center gap-2">
              <p className="text-sm line-through line-clamp-2 text-orange-600 ">
                <i className="text-xs"> 1 Night </i> {post.originalRoomPrice}
              </p>
              <p className="  text-lg bold-lg">
                {" "}
                <i>{"US$ " + post.finalPrice}</i>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
