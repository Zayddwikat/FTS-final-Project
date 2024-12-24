import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ImgObject } from "./imageContainer";

export const DialogImageContainer: React.FC<any> = ({
  roomGallery,
  element,
}) => {
  return (
    <>
      <div className="w-8/12">
        <div className="h-[85%] relative ">
          <button className="absolute top-[45%] z-10 rounded-3xl w-10 h-10 border py-1 left-1 bg-white opacity-70 hover:opacity-100">
            <ArrowBackIcon />
          </button>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            className="rounded-md relative"
            src={roomGallery.data.url || element.roomPhotoUrl}
            // src={element.roomPhotoUrl}
            alt=""
          />
          <button className="absolute w-10 h-10 top-[45%] right-1 z-10 rounded-3xl border  bg-white opacity-70 hover:opacity-100">
            <ArrowForwardIcon />
          </button>
        </div>
        <div className="flex flex-row gap-1">
          {roomGallery.data.length > 0
            ? roomGallery.data.map((img: ImgObject) => {
                return (
                  <div className="w-11/12">
                    <img
                      src={img.url}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      className="rounded"
                      alt="hotel Photos"
                    ></img>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};
