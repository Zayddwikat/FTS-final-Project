import { FormEventHandler } from "react";

interface RatingReviewProps {
  rating: number;
  setRating?: Function;
  onChange?: FormEventHandler<HTMLSpanElement>;
}

export const RatingReview: React.FC<RatingReviewProps> = ({
  rating,
  setRating,
  onChange,
}) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            className="start"
            key={star}
            id="Rate"
            name="Rate"
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: `20px`,
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
};
