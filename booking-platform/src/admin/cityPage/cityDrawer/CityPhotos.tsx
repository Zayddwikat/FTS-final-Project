import { SwiperSection } from "../../photosPage/swiperSection";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import { ImgObject } from "../../../user/hotelPage/component/hotelDetails/imageContainer/imageContainer";
import { CityInformation } from "../../../data_models/cities";

interface CityPhotosProps {
  city: CityInformation;
  cityPhotos: ImgObject[] | undefined;
}

const CityPhotos: React.FC<CityPhotosProps> = ({ city, cityPhotos }) => {
  return (
    <>
      {cityPhotos ? (
        <div className="flex flex-col justify-start gap-4 items-start w-[90%] h-[40%]">
          <SwiperSection imgs={cityPhotos} />
        </div>
      ) : (
        <div className="w-11/12">
          <img
            src="https://oionline.com/wp-content/uploads/2018/03/notfound.jpg"
            alt="City image"
            style={{
              width: "100%",
              height: "80%",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <Link
        to={`/AdminHome/photos/city/:${city.id}`}
        state={{ data: city }}
        className="text-blue-400 underline self-start"
      >
        all photos
      </Link>
      <Divider />
    </>
  );
};

export default CityPhotos;
