import { createContext, ReactNode, useContext, useState } from "react";
import { ImgObject } from "../../user/hotelPage/component/imageContainer";
import { baseUrl } from "../../const/constantVariables";
import { getRoomGallery } from "../../user/hotelPage/Hooks/getRoomGallery";

export const imageContext = createContext<any>([]);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<Array<ImgObject>>([]);
  const [hotelImages, setHotelImages] = useState<Array<ImgObject>>([]);
  const [cityImages, setCityImages] = useState<Array<ImgObject>>([]);
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

  const addHotelImg = async (hotelId: number, imageUrl: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/hotels/${hotelId}/photos`, {
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
        .catch((err) => new Error("Error in adding new Hotel image ", err));
      setHotelImages([...hotelImages, response]);
    } catch (err) {
      console.log(err);
    }
  };

  const getCityGallery = async (cityId: number) => {
    try {
      const response = await fetch(`${baseUrl}/api/cities/${cityId}/photos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => new Error("Error in fetching city Images  ", err));
      setCityImages(response);
    } catch (err) {
      console.log(err);
    }
  };

  const addCityImg = async (cityId: number, imgUrl: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/cities/${cityId}/photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          url: imgUrl,
        }),
      })
        .then((res) => res.json())
        .catch((err) => new Error("Error in adding image", err));
      setCityImages([...cityImages, response]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCityImg = async (cityId: number, imgId: number) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/cities/${cityId}/photos/${imgId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => (res.status === 204 ? true : false))
        .catch((err) => new Error("Error in deleting img ", err));
      setCityImages(cityImages.filter((img) => img.id !== imgId));
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
        deleteHotelImg,
        addHotelImg,
        cityImages,
        getCityGallery,
        addCityImg,
        deleteCityImg,
      }}
    >
      {children}
    </imageContext.Provider>
  );
};

export const useImageContext = () => {
  return useContext(imageContext);
};
