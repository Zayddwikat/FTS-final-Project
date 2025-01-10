import { FormikProps } from "formik";
import { useState } from "react";
import { hotelObject } from "../../../admin/component/cityInformationDrawer";
import { AmenitiesInformation } from "../../../data_models/amenitiesInformation";
import { hotelInformation } from "../../../data_models/hotelInformation";

interface onFilterInformation {
  data: any;
  formik: FormikProps<any>;
}

export default function useFilterSelected() {
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const onFilteredAdded = async ({ data, formik }: onFilterInformation) => {
    let filtered = [...data];

    if (formik.values.budget > 0) {
      filtered = filtered.filter(
        (hotel) => hotel.roomPrice <= formik.values.budget
      );
    }

    // Filter by doubleRoom
    // if (formik.values.doubleRoom) {
    //   filtered = filtered.filter((hotel: hotelInformation) =>
    //     hotel.amenities.map((amen) => amen.name === "wifi")
    //   );
    // }

    // Filter by Wifi
    if (formik.values.Wifi) {
      filtered = filtered.filter((hotel: hotelInformation) =>
        hotel.amenities.map((amen) => amen.name === "wifi")
      );
    }

    if (formik.values.rating > 0) {
      filtered = filtered.filter(
        (hotel) => hotel.rating >= formik.values.rating
      );
    }

    if (formik.values.hotels) {
      filtered = filtered.filter((hotel) => hotel.isHotel === true);
    }

    setFilteredData(filtered);
    return filtered;
  };

  const onFilterChange = (formik: FormikProps<any>, data: any) => {
    let resultArr = [...data];

    // Handle all filters in one function
    if (formik.values.hotels) {
      resultArr = resultArr.filter((hotel) => hotel.isHotel === true);
    }

    if (formik.values.Wifi === "true") {
      resultArr = resultArr.filter((hotel) => hotel.hasWifi === true);
    }

    if (formik.values.doubleRoom) {
      resultArr = resultArr.filter((hotel) => hotel.roomType === "Double");
    }

    if (formik.values.budget > 0) {
      resultArr = resultArr.filter(
        (hotel) => hotel.roomPrice <= formik.values.budget
      );
    }

    if (formik.values.rating > 0) {
      resultArr = resultArr.filter(
        (hotel) => hotel.rating >= formik.values.rating
      );
    }

    return resultArr;
  };

  return { onFilterChange, onFilteredAdded, filteredData };
}
