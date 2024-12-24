import { useLocation } from "react-router-dom";
import Header from "../HomePage/component/header";
import { SearchBar } from "../HomePage/component/SearchBar";
import { CheckBoxesGroup } from "./component/checkBoxGroup";
import { useFormik } from "formik";
import { BudgetSlider } from "./component/budgetSlider";
import { Post } from "../HomePage/component/SearchPost";
import { useQuery } from "@tanstack/react-query";
import useFilterSelected from "./hooks/filterHooks";

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
      // const res = await onFilterChange(formik, data);
      const res = await onFilteredAdded({ data, formik });
      return res;
    },
  });
  console.log(HotelFiltered.data);
  if (HotelFiltered.data) {
    return (
      <main className="flex flex-col  w-full items-center justify-center ">
        <Header />
        <main className=" flex flex-col  justify-center items-center gap-2 md:w-[95dvw] w-full">
          <header>
            <SearchBar cityTextField={true} data={valuesOfSearchBar} />
          </header>
          <main className="flex lg:flex-row flex-col md:flex-col mb-10 gap-2 w-full">
            <aside className="flex md:flex-col h-fit lg:flex-col flex-col overflow-x-scroll lg:overflow-hidden md:overflow-hidden items-center gap-2 justify-start md:basis-1/5">
              <form className=" p-4 flex flex-row md:flex-col lg:flex-col items-center lg:items-start md:items-start justify-center border border-black rounded-md shadow">
                <CheckBoxesGroup
                  filters={["hotels", "Wifi", "roomPrice", "doubleRoom"]}
                  formik={formik}
                  data={data}
                />
                <BudgetSlider formik={formik} data={data} />
              </form>

              {/* <form className="w-4/5 p-4 gap-4 border border-black rounded-md shadow flex flex-row md:flex-col items-center lg:items-start md:items-start justify-center">
                <CheckBoxesGroup
                  filters={["hotels", "Wifi", "location", "Budget"]}
                  formik={formik}
                />
                <BudgetSlider formik={formik} />
              </form> */}
            </aside>

            <main className=" flex flex-col  flex-wrap md:w-[70dvw] lg:w-[70dvw] gap-2 mb-10">
              {HotelFiltered.data.map((element: any, index: number) => {
                return (
                  <div className="gap-2" key={index}>
                    <Post post={element} values={valuesOfSearchBar} />
                  </div>
                );
              })}
            </main>
          </main>
        </main>
      </main>
    );
  }
}
