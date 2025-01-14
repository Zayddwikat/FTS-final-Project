import { LoadingScreen } from "../../component/loadingPage";
import Header from "./component/header/header";
import Slider from "./component/header/slider";
import SliderSkeletonLoader from "./component/header/sliderSkeletonScreen";
import LoadingPost from "./component/loadingPost";
import SearchBarSkeletonLoader from "./component/SearchBar/component/searchBarSkeletonLoader";
import { SearchProvider } from "./component/SearchBar/component/searchContextApi";
import { lazy, memo, Suspense } from "react";

const SearchBar = memo(
  lazy(() => import("./component/SearchBar/component/searchBar"))
);
const Deals = memo(lazy(() => import("./component/dealsPosts/deals")));
const RecentHotels = memo(
  lazy(() => import("./component/recentHotels/recentHotels"))
);
const TrendingHotels = memo(
  lazy(() => import("./component/trendingHotels/trendingHotels"))
);
// pre-load component 
import("./component/SearchBar/component/searchBar");
import("./component/dealsPosts/deals");
import("./component/recentHotels/recentHotels");
import("./component/trendingHotels/trendingHotels");

export default function HomePage() {
  return (
    <main className="flex flex-col items-center ">
      <SearchProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Header />
          <section className="w-[90dvw] flex flex-col items-center justify-center">
            <Suspense fallback={<SliderSkeletonLoader />}>
              <Slider />
            </Suspense>

            <Suspense fallback={<SearchBarSkeletonLoader />}>
              <SearchBar
                cityTextField={true}
                data={undefined}
                searchValues={undefined}
              />
            </Suspense>
            <Suspense fallback={<LoadingPost />}>
              <Deals />
            </Suspense>
            <Suspense fallback={<LoadingPost />}>
              <RecentHotels />
            </Suspense>
            <Suspense fallback={<LoadingPost />}>
              <TrendingHotels />
            </Suspense>
          </section>
        </Suspense>
      </SearchProvider>
    </main>
  );
}
