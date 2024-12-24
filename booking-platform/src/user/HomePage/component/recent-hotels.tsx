import { useSearchContext } from "../../Context/SearchContextApi";
import { useLoginContext } from "../../../Login/Context/LoginContext";
import { useQuery } from "@tanstack/react-query";
import LoadingPost from "./LoadingPost";
import { ErrorPage } from "../../../ErrorPage";
import { recentHotels } from "../hooks/recentHotels";
import { RecentViewedPost } from "./recentViewedPost";
import { recentHotelsInformation } from "../../../classes/recentHotelsPost";
import { element } from "prop-types";
import { Link } from "react-router-dom";

export const RecentHotels: React.FC<any> = () => {
  const recentViewedHotels = useQuery({
    queryKey: ["recentHotels"],
    queryFn: async () => {
      return await recentHotels(1);
    },
  });
  if (recentViewedHotels.isLoading) return <LoadingPost />;
  if (recentViewedHotels.error) return <ErrorPage />;
  console.table(recentViewedHotels.data);
  return (
    <section className="flex flex-col gap-2 mt-4 w-full">
      <header className="flex flex-row items-center w-full justify-between ">
        <h1 className="text-3xl">Recent Hotels</h1>
        <Link className="  " to={"/Show-more"}>
          <h1 className="text-sm text-blue-600 underline">show more</h1>
        </Link>
      </header>
      <main className="flex flex-row flex-wrap md:flex-nowrap w-full gap-4">
        {recentViewedHotels.data.map(
          (element: recentHotelsInformation, index: number) => {
            return (
              <div className="flex flex-row flex-wrap md:flex-nowrap w-full ">
                <RecentViewedPost post={element} />
              </div>
            );
          }
        )}
      </main>
    </section>
  );
};
