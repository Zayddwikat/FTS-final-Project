interface PostInformation {
  thumbnailUrl: string;
  cityName: string;
  countryName: string;
  description: string;
}

interface TrendingPostProps {
  post: PostInformation;
}

export const TrendingPost: React.FC<TrendingPostProps> = ({ post }) => {
  const handleClickedDeals = (post: PostInformation) => {
    console.log("clicked", post.cityName);
  };

  return (
    <div
      onClick={() => handleClickedDeals(post)}
      className="rounded-md w-full sm:w-[95%] md:w-[70%] lg:w-[18dvw] xl:w-[16dvw] p-2 mb-8"
    >
      <div className="h-[40dvh] flex flex-col items-start">
        <img
          className="rounded-md w-full h-[75%] object-cover"
          loading="lazy"
          src={post.thumbnailUrl}
          alt={`Thumbnail for ${post.cityName}`}
        />
        <article className="flex flex-col items-start w-full mt-2">
          <span className="flex flex-row flex-wrap">
            <p className="text-sm font-semibold">{post.cityName},</p>
            <p className="text-sm font-bold text-gray-700 ml-1">
              {post.countryName}
            </p>
          </span>

          <div className="w-full mt-1">
            <p className="text-sm line-clamp-2">{post.description}</p>
          </div>
        </article>
      </div>
    </div>
  );
};
export default TrendingPost;
