import PropTypes from "prop-types";
import { useSearchContext } from "../../Context/SearchContextApi";

export default function SearchResult({ values }) {
  const {  searchResult } = useSearchContext();
 console.table(searchResult)
  return (
    <div>
      {values.map((elem) => {
        return (
          <div key={elem.hotelId}>
            <h2>{elem.hotelId}</h2>
          </div>
        );
      })}
    </div>
  );
}

SearchResult.propTypes = {
  values: PropTypes.obj,
};
