import { useSearchContext } from "../SearchBar/component/searchContextApi";
import { Post } from "./post";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingPost from "../loadingPost";
import React from "react";

export default function Deals() {
  const { onFeaturedDeals } = useSearchContext();

  const hotelDeals = useQuery({
    queryKey: ["featuredDeals"],
    queryFn: async () => {
      const res = await onFeaturedDeals();
      return res;
    },
  });
  if (hotelDeals.isLoading) return <LoadingPost />;

  if (hotelDeals.isError) return <h1> {JSON.stringify(hotelDeals.error)}</h1>;
  return (
    <>
      <main className="flex flex-col items-start w-full gap-4 items-start ">
        <header className="flex flex-row items-center w-full justify-between ">
          <h1 className="text-3xl">Deals</h1>
          <Link className="  " to={"/Show-more"}>
            <h1 className="text-sm text-blue-600 underline">show more</h1>
          </Link>
        </header>
        <div className="flex flex-row flex-wrap md:flex-nowrap w-full gap-4">
          {hotelDeals.data.slice(0, 5).map((elem: any, index: number) => (
            <React.Fragment key={index}>
              <Post key={index} post={elem} />
            </React.Fragment>
          ))}
        </div>
      </main>
    </>
  );
}
