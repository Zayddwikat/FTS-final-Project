import { createContext, ReactNode, useContext, useState } from "react";
import { ImgObject } from "../../user/HotelPage/component/imageContainer";
import { baseUrl } from "../../const/constantVariables";
import { getRoomGallery } from "../../user/HotelPage/Hooks/getRoomGallery";

export const imageContext = createContext<any>([]);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<Array<ImgObject>>([]);
  const [hotelImages, setHotelImages] = useState<Array<ImgObject>>([]);
  const token = localStorage.getItem("ADMIN_TOKEN");

  const getRoomImage = async (roomId: number) => {
    try {
      const data = await getRoomGallery(roomId);
      setImages(data);
      return images;
    } catch (err) {
      console.log(err);
    }
  };

  const addImageToRoom = async (roomId: number, imageUrl: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/rooms/${roomId}/photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          url: imageUrl,
        }),
      })
        .then((res) => res.json())
        .catch((err) => new Error("Error in adding image", err));
      setImages([...images, response]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteImgFromRoom = async (roomId: number, photoId: number) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/rooms/${roomId}/photos/${photoId}`,

        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => (res.status === 204 ? true : false))
        .catch((err) => new Error("Error in deleting image ", err));
      setImages(images.filter((img) => img.id !== photoId));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getHotelGallery = async (hotelId: number) => {
    const data = await fetch(`${baseUrl}/api/hotels/${hotelId}/gallery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => await res.json())
      .catch((err) => new Error("Error in fetching Data ", err));
    setHotelImages(data);
    return data;
  };

  const deleteHotelImg = async (hotelId: number, photoId: number) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/hotels/${hotelId}/photos/${photoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => (res.status === 204 ? true : false))
        .catch((err) => new Error("Error in deleting images", err));
      setHotelImages(hotelImages.filter((img) => img.id !== photoId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <imageContext.Provider
      value={{
        images,
        addImageToRoom,
        getRoomImage,
        handleDeleteImgFromRoom,
        hotelImages,
        getHotelGallery,
        deleteHotelImg
      }}
    >
      {children}
    </imageContext.Provider>
  );
};

export const useImageContext = () => {
  return useContext(imageContext);
};
