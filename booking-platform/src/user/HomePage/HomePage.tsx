import Header from "./component/header";
import { SearchBar } from "./component/searchBar";
import Deals from "./component/deals";
import { SearchProvider } from "../Context/searchContextApi";
import {RecentHotels} from "./component/recent-hotels";
import TrendingHotels from "./component/trendingHotels";
import Slider from "./component/slider";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center ">
      <SearchProvider>
        <Header />
        <section className="w-[90dvw] flex flex-col items-center justify-center">
          <Slider />
          <SearchBar cityTextField={true} />
          <Deals />
          <RecentHotels />
          <TrendingHotels />
        </section>
      </SearchProvider>
    </main>
  );
}
