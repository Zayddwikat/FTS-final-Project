import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PostObjectInformation from "../../../classes/postObjectInfo";
import { Anchor } from "./Drawer";
import { Button } from "../../../Login/component/LoginButton";
import { ReviewContainer } from "./ReviewContainer";

interface ListReviewProps {
  post: PostObjectInformation;
  onClose: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export const ListReviews: React.FC<ListReviewProps> = ({ post, onClose }) => {
  console.log("the function is : ", onClose);
  const addReviews = () => {};
  console.log("the Post Is : ", post);

  return (
    <>
      <div className="m-4">
        <Box
          sx={{ width: "60dvw" }}
          role="presentation"
          onClick={onClose("right", false)}
          onKeyDown={onClose("right", false)}
        >
          <div className="flex flex-row items-center justify-start w-full">
            <p className="text-md border text-white bg-blue-700 p-0.5 rounded-md">
              {post.starRating * 2}
              {""}
            </p>
            <p className="text-sm  px-2 rounded-md">
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
          </div>
        </Box>
      </div>
      <Divider />
      <>
        <ReviewContainer post={post} />
      </>
    </>
  );
};
