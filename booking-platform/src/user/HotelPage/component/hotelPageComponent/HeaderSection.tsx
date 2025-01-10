import Header from "../../../homePage/component/header";
import { SearchBar } from "../../../homePage/component/searchBar";

export const HeaderSection: React.FC<{ searchValue: any }> = ({ searchValue }) => {
  return (
    <>
      <Header />
      <SearchBar cityTextField={true} data={undefined} searchValues={searchValue} />
    </>
  );
};
