import { useQuery } from "@tanstack/react-query";
import PostObjectInformation from "../../../classes/postObjectInfo";
import { useGetReview } from "../Hooks/useGetReviews";
import { LoadingScreen } from "../../../component/LoadingPage";
import { ErrorPage } from "../../../ErrorPage";
import ReviewObjectInfo from "../../../classes/ReviewsObjectInfo";
import { ReviewPost } from "./ReviewPost";

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
