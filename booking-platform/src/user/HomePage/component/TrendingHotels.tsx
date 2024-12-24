import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../../Context/SearchContextApi";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { TrendingPost } from "./TrendingPost";

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
  if (HotelsTrending.isLoading)
    return (
      <div className="flex  flex-row">
        {[1, 2, 3, 4].map((elem, index) => (
          <div className="" key={index}>
            <Skeleton
              className="m-4 rounded-md lg:w-[21dvw] md:w-[70dvw]"
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

  if (HotelsTrending.isError)
    return <pre>{JSON.stringify(HotelsTrending.error)}</pre>;
  return (
    <main className="flex flex-col my-4 items-start w-full gap-4 items-start ">
      <header className="flex flex-row items-center w-full justify-between ">
        <h1 className="text-3xl">Trending Hotels</h1>
        <Link className="  " to={"/Show-more"}>
          <h1 className="text-sm text-blue-600 underline">show more</h1>
        </Link>
      </header>
      <div className="flex flex-row flex-wrap md:flex-nowrap w-full gap-4">
        {HotelsTrending.data.slice(0, 5).map((elem: any, index: number) => (
          <>
            <TrendingPost key={index} post={elem} />
          </>
        ))}
      </div>
    </main>
  );
}
