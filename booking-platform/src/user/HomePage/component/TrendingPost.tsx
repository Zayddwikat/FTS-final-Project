import PropTypes from "prop-types";

interface PostInformation {
  thumbnailUrl: string;
  cityName: string;
  countryName: string;
  description: string;
}

interface TrendingPostProps {
  post: PostInformation;
}
export const TrendingPost: React.FC<TrendingPostProps> = ({post}) => {
  const handleClickedDeals = (post: PostInformation) => {
    console.log("clicked", post.cityName);
  };
  return (
    <div
      onClick={() => handleClickedDeals(post)}
      className="rounded-md w-[100dvw] lg:w-[18dvw] md:w-[70dvw]   "
    >
      <div className="h-[40dvh] flex flex-col items-start">
        <img
          className="rounded-md md:w-full w-[95dvw]"
          loading="lazy"
          style={{
            height: "75%",
            objectFit: "cover",
          }}
          src={post.thumbnailUrl}
        />
        <article className="flex flex-col  items-start md:w-full w-[100dvw] my-1">
          <span className="flex flex-row">
            <p className="text-sm">{post.cityName + ","} </p>
            <p className="text-sm text-bold">{post.countryName}</p>
          </span>

          <div className=" w-full">
            <p className="text-sm  line-clamp-2 ">{post.description}</p>
          </div>
        </article>
      </div>
    </div>
  );
};
