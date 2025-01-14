import { useLocation } from "react-router-dom";
import Header from "../homePage/component/header/header";
import { useFormik } from "formik";
import { BudgetSlider } from "./component/budgetSlider";
import { Post } from "../homePage/component/searchPost";
import { useQuery } from "@tanstack/react-query";
import useFilterSelected from "./hooks/filterHooks";
import { lazy, memo, Suspense } from "react";
import SearchBarSkeletonLoader from "../homePage/component/SearchBar/component/searchBarSkeletonLoader";
import SkeletonSearchPage from "./skeletonSearchPage";
import { ErrorPage } from "../../ErrorPage";

const SearchBar = memo(
  lazy(() => import("../homePage/component/SearchBar/component/searchBar"))
);
const CheckBoxesGroup = memo(lazy(() => import("./component/checkBoxGroup")));

interface PostData {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  cityName: string;
}
interface SearchData {
  adult: number;
  children: number;
  city: string;
  rooms: number;
  CheckIn: Date;
  CheckOut: Date;
  Rate: number;
}
interface LocationState {
  data: PostData[];
  valuesOfSearchBar: SearchData;
}

export default function SearchPage() {
  const { onFilteredAdded, onFilterChange } = useFilterSelected();
  const location = useLocation();
  const { data, valuesOfSearchBar }: LocationState = location.state || {};

  const formik = useFormik({
    initialValues: {
      hotels: false,
      budget: 0,
      doubleRoom: false,
      rating: 0,
      location: "",
      Wifi: "false",
    },
    onSubmit: (values) => {
      console.table(values);
    },
  });

  const HotelFiltered = useQuery({
    queryKey: ["hotel", formik.values, data],
    queryFn: async () => {
      const res = await onFilteredAdded({ data, formik });
      return res;
    },
  });
  if (HotelFiltered.isLoading) return <SkeletonSearchPage />;
  if (HotelFiltered.error) return <ErrorPage />;

  if (HotelFiltered.data) {
    return (
      <main className="flex flex-col w-full items-center justify-center">
        <Header />
        <main className="flex flex-col justify-center items-center gap-2 w-full md:w-[95vw] lg:w-[90vw] px-4">
          <header className="w-full mb-4">
            <Suspense fallback={<SearchBarSkeletonLoader />}>
              <SearchBar cityTextField={true} data={valuesOfSearchBar} />
            </Suspense>
          </header>
          <main className="flex flex-col lg:flex-row gap-4 w-full">
            <aside className="flex flex-col items-center gap-4 w-full lg:w-1/5 mb-6">
              <form className="w-full p-4 border border-black rounded-md shadow-lg flex flex-col items-center gap-4">
                <Suspense>
                  <CheckBoxesGroup
                    filters={["hotels", "Wifi", "doubleRoom"]}
                    formik={formik}
                    data={data}
                  />
                </Suspense>
                <BudgetSlider formik={formik} data={data} />
              </form>
            </aside>

            <section className="flex flex-col gap-6 w-full lg:w-4/5 mb-10">
              {HotelFiltered.data.map((element: any, index: number) => (
                <div className="gap-2" key={index}>
                  <Post post={element} values={valuesOfSearchBar} />
                </div>
              ))}
            </section>
          </main>
        </main>
      </main>
    );
  }
}
