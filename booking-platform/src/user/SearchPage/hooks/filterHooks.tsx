import { FormikFormProps, FormikProps } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
interface onFilterInformation {
  data: any;
  formik: FormikProps<any>;
}
interface onFilterChangeProps {
  formik: FormikProps<any>;
}

export default function useFilterSelected() {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const onFilteredAdded = async ({ data, formik }: onFilterInformation) => {
    if (formik.values.budget === 0) {
      return data;
    }
    const filteredDataNew = data.filter(
      (hotel) => hotel.roomPrice >= formik.values.budget
    );
    setFilteredData((prevData) => [...prevData, ...filteredDataNew]);
    return filteredDataNew;
  };

  const onFilterChange = (formik: FormikProps<any>, data: any, filter: any) => {
    const resultArr = [];
    if (formik.values.doubleRoom === true) {
      const doubleRoom = data.filter((hotel) => {
        if (hotel.roomType === "Double") resultArr.push(hotel);
      });
      console.log(resultArr);
      return resultArr;
    } else {
      return data;
    }
  };

  return { onFilterChange, onFilteredAdded };
}
