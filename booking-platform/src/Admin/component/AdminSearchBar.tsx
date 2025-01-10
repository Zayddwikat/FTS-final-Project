import { useFormik } from "formik";
import { Button } from "../../login/loginForm/loginButton";
import { useAmenitiesContext } from "../context/amenitiesContext";
import { useCityContext } from "../context/cityContext";
import { useHotelContext } from "../context/hotelContext";

export const AdminSearch: React.FC<any> = () => {
  const { searchAmenitiesRoom, searchAmenities } = useAmenitiesContext();
  const { searchCities } = useCityContext();
  const { searchHotels } = useHotelContext();

  const formik = useFormik({
    initialValues: {
      searchCriteria: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values.searchCriteria);
      setSubmitting(false);
      if (searchHotels) searchHotels(values.searchCriteria);
      if (searchAmenities) searchAmenities(values.searchCriteria);
      if (searchAmenitiesRoom) searchAmenitiesRoom(values.searchCriteria);
      if (searchCities) searchCities(values.searchCriteria);
    },
  });

  return (
    <div className="flex flex-row gap-2 ">
      <form onSubmit={formik.handleSubmit}>
        <input
          className="p-2 w-[30dvw] border border-black rounded"
          type="text"
          id="searchCriteria"
          name="searchCriteria"
          value={formik.values.searchCriteria}
          onChange={(e) => {
            formik.handleChange(e);
            if (searchHotels) searchHotels(e.target.value);
            if (searchAmenities) searchAmenities(e.target.value);
            if (searchAmenitiesRoom) searchAmenitiesRoom(e.target.value);
            if (searchCities) searchCities(e.target.value);
          }}
          placeholder="Search....."
        />
      </form>
      <Button
        children={""}
        className="cursor-pointer"
        color="black"
        primary
        handleClick={(e) => {
          console.log("clicked");
          formik.handleSubmit(e);
        }}
        isSubmitting={formik.isSubmitting}
        size="small"
        value="Search"
      />
    </div>
  );
};
