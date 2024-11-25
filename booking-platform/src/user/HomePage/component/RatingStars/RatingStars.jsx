import PropTypes from "prop-types";

export default function RatingReview({ rating, setRating, onChange }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            className="start"
            key={star}
            id="Rate"
            name='Rate'
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: `35px`,
            }}
            onChange={onChange}
            onClick={() => {
              setRating(star);
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
}
RatingReview.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
