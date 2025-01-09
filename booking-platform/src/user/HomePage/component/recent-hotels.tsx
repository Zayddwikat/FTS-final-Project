import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../../Context/SearchContextApi";
import { useLoginContext } from "../../../login/Context/LoginContext";
import LoadingPost from "./LoadingPost";
import { ErrorPage } from "../../../ErrorPage";
import { recentHotels } from "../hooks/recentHotels";
import { RecentViewedPost } from "./recentViewedPost";
import { recentHotelsInformation } from "../../../data_module/recentHotelsPost";
import { Link } from "react-router-dom";

interface RecentHotelsProps {
  data: recentHotelsInformation[];
}

export const RecentHotels: React.FC = () => {
  const { data: recentViewedHotels, error, isLoading } = useQuery({
    queryKey: ["recentHotels"],
    queryFn: async () => recentHotels(1),
  });

  if (isLoading) return <LoadingPost />;
  if (error) return <ErrorPage />;

  return (
    <section className="flex flex-col gap-2 mt-4 w-full">
      <header className="flex justify-between items-center w-full">
        <h1 className="text-3xl">Recent Hotels</h1>
        <Link to="/Show-more" className="text-sm text-blue-600 underline">
          Show more
        </Link>
      </header>

      <main className="flex flex-wrap gap-2 w-full">
        {recentViewedHotels?.map((post: recentHotelsInformation, index: number) => (
          <div key={index} className="w-full sm:w-[48%] lg:w-[30%] xl:w-[19%] mb-4">
            <RecentViewedPost post={post} />
          </div>
        ))}
      </main>
    </section>
  );
};
