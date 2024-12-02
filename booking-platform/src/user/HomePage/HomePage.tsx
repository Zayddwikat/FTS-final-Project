import Header from "./component/header";
import { SearchBar } from "./component/SearchBar";
import Deals from "./component/Deals";
import { SearchProvider } from "../Context/SearchContextApi";
// import RecentHotels from "./component/recent-hotels";
import TrendingHotels from "./component/TrendingHotels";
import Slider from "./component/slider";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center ">
      <SearchProvider>
        <Header />
        <section className="w-[90dvw] flex flex-col items-center justify-center">
          <Slider />
          <SearchBar data={null} />
          <Deals />
          {/* <RecentHotels /> */}
          <TrendingHotels />
        </section>
      </SearchProvider>
    </main>
  );
}
