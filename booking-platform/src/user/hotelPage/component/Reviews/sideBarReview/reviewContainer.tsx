import { useQuery } from "@tanstack/react-query";
import { useGetReview } from "../useGetReviews";
import { LoadingScreen } from "../../../../../component/loadingPage";
import { ErrorPage } from "../../../../../ErrorPage";
import { ReviewPost } from "./reviewPost";
import PostObjectInformation from "../../../../../data_models/postObjectInfo";
import ReviewObjectInfo from "../../../../../data_models/reviewsObjectInfo";

interface ReviewContainerProps {
  post: PostObjectInformation;
}

export const ReviewContainer: React.FC<ReviewContainerProps> = ({ post }) => {
  const reviewQuery = useQuery({
    queryKey: ["reviews", post.hotelId],
    queryFn: async () => {
      return await useGetReview({ post });
    },
  });
  if (reviewQuery.isLoading) return <LoadingScreen />;
  if (reviewQuery.error) return <ErrorPage />;
  console.log(reviewQuery.data);

  return (
    <div className="flex flex-col gap-4">
    <h1 className="mx-9 my-4 font-bold text-blue-600">Guest Review</h1>
      <ul>
        {reviewQuery.data.map((review: ReviewObjectInfo, index: number) => {
          return (
            <>
              <li key={index}>
                <ReviewPost review={review} post={post} />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};
