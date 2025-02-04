import { useSearchContext } from "../SearchBar/component/searchContextApi";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingPost from "../loadingPost";
import React, { lazy, Suspense } from "react";

const Post = lazy(() => import("./post"));

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
        <header className="flex flex-row items-center w-full justify-start ">
          <h1 className="text-3xl">Deals</h1>
        </header>
        <main className="flex flex-row flex-wrap w-full gap-2">
          {hotelDeals.data.slice(0, 5).map((elem: any, index: number) => (
            <React.Fragment key={index}>
              <Suspense fallback={<LoadingPost />}>
                <Post key={index} post={elem} />
              </Suspense>
            </React.Fragment>
          ))}
        </main>
      </main>
    </>
  );
}
