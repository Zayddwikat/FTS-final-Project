import Header from "../../../HomePage/component/header";
import { SearchBar } from "../../../HomePage/component/SearchBar";

export const HeaderSection: React.FC<{ searchValue: any }> = ({ searchValue }) => {
  return (
    <>
      <Header />
      <SearchBar cityTextField={true} data={undefined} searchValues={searchValue} />
    </>
  );
};
