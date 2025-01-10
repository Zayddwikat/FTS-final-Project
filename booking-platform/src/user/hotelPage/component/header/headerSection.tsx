import Header from "../../../homePage/component/header/header";
import { SearchBar } from "../../../homePage/component/SearchBar/component/searchBar";

export const HeaderSection: React.FC<{ searchValue: any }> = ({ searchValue }) => {
  return (
    <>
      <Header />
      <SearchBar cityTextField={true} data={undefined} searchValues={searchValue} />
    </>
  );
};
