import Header from "./component/header";
import SearchBar from "./component/SearchBar";
import Deals from "./component/Deals";
import { SearchProvider } from "../Context/SearchContextApi";
import RecentHotels from "./component/recent-hotels";
import TrendingHotels from "./component/TrendingHotels";
import Slider from "./component/slider";

export default function HomePage() {
  return (
    <>
      <SearchProvider>
        <Header />
        <Slider />
        <SearchBar />
        <Deals />
        {/* <RecentHotels /> */}
        <TrendingHotels />
      </SearchProvider>
    </>
  );
}
