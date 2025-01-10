import Header from "./component/header/header";
import { SearchBar } from "./component/SearchBar/component/searchBar";
import Deals from "./component/dealsPosts/deals";
import { SearchProvider } from "./component/SearchBar/component/searchContextApi";
import { RecentHotels } from "./component/recentHotels/recentHotels";
import TrendingHotels from "./component/trendingHotels/trendingHotels";
import Slider from "./component/header/slider";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center ">
      <SearchProvider>
        <Header />
        <section className="w-[90dvw] flex flex-col items-center justify-center">
          <Slider />
          <SearchBar
            cityTextField={true}
            data={undefined}
            searchValues={undefined}
          />
          <Deals />
          <RecentHotels />
          <TrendingHotels />
        </section>
      </SearchProvider>
    </main>
  );
}
