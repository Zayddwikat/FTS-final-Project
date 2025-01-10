import { ImgObject } from "../../hotelDetails/imageContainer/imageContainer";

export const DialogImageContainer: React.FC<any> = ({
  roomGallery,
  element,
}) => {
  console.log(roomGallery.data);
  console.log(element);
  return (
    <div className="w-full md:w-8/12 flex flex-col gap-2">
      <div className="relative h-64 md:h-[85%]">
        <img
          src={roomGallery.data.url || element.roomPhotoUrl}
          alt="Room Photo"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {roomGallery.data.length > 0 &&
          roomGallery.data.map((img: ImgObject, index: number) => (
            <div key={index} className="w-24 h-24 flex-shrink-0">
              <img
                src={img.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-md border"
              />
            </div>
          ))}
      </div>
    </div>
  );
};
