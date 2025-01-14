import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../SearchBar/component/searchContextApi";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const TrendingPost = lazy(() => import("./trendingPost"));

const LoadingTrendingPost = () => {
  return (
    <div className="flex flex-wrap gap-4 md:flex-row justify-start">
      {[1, 2, 3, 4].map((elem, index) => (
        <div className="w-full sm:w-[45%] md:w-[22%]" key={index}>
          <Skeleton
            className="m-4 rounded-md"
            variant="rectangular"
            height={250}
          />
          <Box className="mx-2" sx={{ pt: 0.5 }}>
            <Skeleton width={300} />
            <Skeleton width={300} />
          </Box>
        </div>
      ))}
    </div>
  );
};

export default function TrendingHotels() {
  const { onDestinationTrending } = useSearchContext();
  const HotelsTrending = useQuery({
    queryKey: ["trendingHotels"],
    queryFn: async () => {
      // return new Promise.reject("error ");
      const res = await onDestinationTrending();
      return res;
    },
  });

  if (HotelsTrending.isLoading) return <LoadingTrendingPost />;
  if (HotelsTrending.isError)
    return <pre>{JSON.stringify(HotelsTrending.error)}</pre>;

  return (
    <main className="flex flex-col my-4 items-start w-full gap-4">
      <header className="flex flex-row items-center w-full justify-between">
        <h1 className="text-3xl">Trending Hotels</h1>
        <Link className="" to={"/Show-more"}>
          <h1 className="text-sm text-blue-600 underline">show more</h1>
        </Link>
      </header>
      <div className="flex flex-wrap gap-1 w-full justify-start">
        {HotelsTrending.data.slice(0, 5).map((elem: any, index: number) => (
          <div className="w-full sm:w-[45%] md:w-[19%]" key={index}>
            <Suspense fallback={<LoadingTrendingPost />}>
              <TrendingPost post={elem} />
            </Suspense>
          </div>
        ))}
      </div>
    </main>
  );
}
