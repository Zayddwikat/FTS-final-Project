import { useFormik } from "formik";
import { Button } from "../../Login/component/LoginButton";
import { useAmenitiesContext } from "../context/amenitiesContext";

export const AdminSearch: React.FC<any> = () => {
  const { searchAmenitiesRoom, searchAmenities } = useAmenitiesContext();

  const formik = useFormik({
    initialValues: {
      searchCriteria: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values.searchCriteria);
      setSubmitting(false);
      searchAmenitiesRoom(values.searchCriteria);
      searchAmenities(values.searchCriteria);
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
            searchAmenities(e.target.value);
          }}
          placeholder="Search....."
        />
      </form>
      <Button
        children={""}
        className=""
        color="black"
        primary
        handleClick={formik.handleSubmit}
        isSubmitting={formik.isSubmitting}
        size="small"
        value="Search"
      />
    </div>
  );
};
