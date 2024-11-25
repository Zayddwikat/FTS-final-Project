import Header from "./component/header";
import SearchBar from "./component/SearchBar";
import Deals from "./component/Deals";
import { SearchProvider } from "../Context/SearchContextApi";
export default function HomePage() {
  return (
    <>
      <SearchProvider>
        <Header />
        <SearchBar />
        <Deals />
      </SearchProvider>

      <h1>hi From home page</h1>
    </>
  );
}
