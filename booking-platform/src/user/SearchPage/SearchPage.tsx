import { useLocation } from "react-router-dom";
import Header from "../HomePage/component/header";
import { SearchBar } from "../HomePage/component/SearchBar";
import { CheckBoxesGroup } from "./component/checkBoxGroup";
import { useFormik } from "formik";
import { BudgetSlider } from "./component/budgetSlider";
import { Post } from "../HomePage/component/Post";

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
  const location = useLocation();
  const { data, valuesOfSearchBar }: LocationState = location.state || {};
  const formik = useFormik({
    initialValues: {
      hotels: false,
      budget: 0,
      rating: 0,
      location: "",
      Wifi: false,
    },
    onSubmit: (values) => {
      console.log("Hellloooooo");
    },
  });

  return (
    <main className="flex flex-col w-full items-center justify-center ">
      <Header />
      <main className=" flex flex-col gap-2 md:w-[95dvw] w-full">
        <header>
          <SearchBar data={valuesOfSearchBar} />
        </header>
        <main className="flex lg:flex-row flex-col md:flex-col mb-10 gap-2 w-full">
          <aside className="flex md:flex-col h-fit lg:flex-col flex-col overflow-x-scroll lg:overflow-hidden md:overflow-hidden items-center gap-2 justify-start md:basis-1/5">
            <form className="w-4/5 p-4 flex flex-row md:flex-col items-center lg:items-start md:items-start justify-center border border-black rounded-md shadow">
              <CheckBoxesGroup
                filters={["hotels", "Wifi", "location", "Budget"]}
                formik={formik}
                data={data}
              />
              <BudgetSlider formik={formik} />
            </form>

            <form className="w-4/5 p-4 gap-4 border border-black rounded-md shadow flex flex-row md:flex-col items-center lg:items-start md:items-start justify-center">
              <CheckBoxesGroup
                filters={["hotels", "Wifi", "location", "Budget"]}
                formik={formik}
              />
              <BudgetSlider formik={formik} />
            </form>
          </aside>

          <main className=" flex flex-row flex-wrap w-full gap-1 mb-10">
            {data.slice(0, 10).map((element, index) => {
              return (
                <div className=" w-auto flex flex-col gap-2" key={index}>
                  <Post post={element} />
                </div>
              );
            })}
          </main>
        </main>
      </main>
    </main>
  );
}
