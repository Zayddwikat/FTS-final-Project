import { useQuery } from "@tanstack/react-query";
import { recentHotels } from "./hooks/recentHotels";
import LoadingPost from "../loadingPost";
import { ErrorPage } from "../../../../ErrorPage";
import { Link } from "react-router-dom";
import { recentHotelsInformation } from "../../../../data_models/recentHotelsPost";
import { RecentViewedPost } from "./recentViewedPost";

export const RecentHotels: React.FC = () => {
  const {
    data: recentViewedHotels,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recentHotels"],
    queryFn: async () => recentHotels(1),
  });

  if (isLoading) return <LoadingPost />;
  if (error) return <ErrorPage />;

  const limitedHotels = recentViewedHotels?.slice(0, 5);

  return (
    <section className="flex flex-col gap-4 p-4 mt-4 w-full">
      <header className="flex justify-between items-center w-full">
        <h1 className="text-2xl md:text-3xl">Recent Hotels</h1>
        <Link to="/Show-more" className="text-sm text-blue-600 underline">
          Show more
        </Link>
      </header>

      <main className="flex flex-wrap justify-start gap-2 w-full">
        {limitedHotels?.map((post: recentHotelsInformation, index: number) => (
          <div
            key={index}
            className="w-full sm:w-[48%] lg:w-[30%] xl:w-[19%] mb-4"
          >
            <RecentViewedPost post={post} />
          </div>
        ))}
      </main>
    </section>
  );
};
