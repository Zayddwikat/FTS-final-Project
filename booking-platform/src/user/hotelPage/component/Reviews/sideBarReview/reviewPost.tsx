import { useQuery } from "@tanstack/react-query";
import { Avatar, Divider } from "@mui/material";
import ReviewObjectInfo from "../../../../../data_models/reviewsObjectInfo";
import PostObjectInformation from "../../../../../data_models/postObjectInfo";

interface ReviewPostProps {
  review: ReviewObjectInfo;
  post: PostObjectInformation;
}

export const ReviewPost: React.FC<ReviewPostProps> = ({ review, post }) => {
  return (
    <div className="hover:drop-shadow-md ">
      <div className="mx-4 flex flex-row gap-4 my-2 p-1 ">
        <div className="flex flex-row gap-2 font-bold items-center justify-start mx-2 w-[20%]">
          <Avatar
            sx={{
              width: 35,
              height: 35,
            }}
          >
            {review.customerName[0]}
          </Avatar>
          <p className="line-clamp-2 text-sm">{review.customerName}</p>
        </div>
        <div className="flex flex-row w-[70%] items-center justify-start">
          <p className="text-wrap line-clamp-2">{review.description}</p>
        </div>
        <div className="w-[10%] flex flex-row items-center justify-center ">
          <p className="text-md border text-white bg-blue-700 p-0.5 rounded-md">
            {post.starRating * 2}
          </p>
        </div>
      </div>
      <Divider />
    </div>
  );
};
