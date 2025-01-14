import { lazy, memo, Suspense } from "react";
import Header from "../../../homePage/component/header/header";
import SearchBarSkeletonLoader from "../../../homePage/component/SearchBar/component/searchBarSkeletonLoader";

const SearchBar = memo(
  lazy(
    () => import("../../../homePage/component/SearchBar/component/searchBar")
  )
);

export const HeaderSection: React.FC<{ searchValue: any }> = ({
  searchValue,
}) => {
  return (
    <>
      <Header />
      <Suspense fallback={<SearchBarSkeletonLoader />}>
        <SearchBar
          cityTextField={true}
          data={undefined}
          searchValues={searchValue}
        />
      </Suspense>
    </>
  );
};
export default HeaderSection;
