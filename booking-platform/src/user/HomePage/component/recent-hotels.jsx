import { useSearchContext } from "../../Context/SearchContextApi";
import { useLoginContext } from "../../../Login/Context/LoginContext";
import { useQuery } from "@tanstack/react-query";
import LoadingPost from "./LoadingPost";
import ErrorPage from "../../../ErrorPage";

export default function RecentHotels() {
  const { userData } = useLoginContext();
  const { onRecentHotels } = useSearchContext();

  const RecentViewedHotels = useQuery({
    queryKey: ["recentHotels"],
    queryFn: async () => {
      //   return new Promise.reject("Error");
      const res = await onRecentHotels(userData.id);
      return res;
    },
  });
  if (RecentViewedHotels.isLoading) return <LoadingPost />;
  if (RecentViewedHotels.error) return <ErrorPage />;

  return (
    <section className="flex flex-col gap-4">
      <h1>Recent Hotels</h1>
      <main>
        {RecentViewedHotels.data.map((element) => {
          <h1>{element.hotelId}</h1>;
        })}
      </main>
    </section>
  );
}
