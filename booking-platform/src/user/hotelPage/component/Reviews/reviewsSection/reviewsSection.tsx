import { ReviewPostPrimary } from "./reviewPostPrimary";

export const ReviewsSection: React.FC<any> = ({ post }) => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 mt-8 mb-20">
      <ReviewPostPrimary {...post} />
    </div>
  );
};
