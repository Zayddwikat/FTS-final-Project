import { createContext, ReactNode, useContext, useState } from "react";
import { deleteHotel } from "../hooks/deleteHotelFromCity";
import { hotelObject } from "../component/CityInformationDrawer";
import { Anchor } from "../component/Drawer";
import { baseUrl } from "../../const/constantVariables";
import { AmenitiesInformation } from "../../classes/amenitiesInformation";
import { roomInformation } from "../../classes/roomInformation";

export const AmenitiesContext = createContext<any>([]);

export const AmenitiesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [amenities, setAmenities] = useState<Array<AmenitiesInformation>>([]);
  const [filteredAmenities, setFilteredAmenities] = useState<
    Array<AmenitiesInformation>
  >([]);

  const [filteredRoomAmenities, setFilteredRoomAmenities] = useState<
    Array<AmenitiesInformation>
  >([]);
  const [roomAmenities, setRoomAmenities] = useState<
    Array<AmenitiesInformation>
  >([]);

  const token = localStorage.getItem("ADMIN_TOKEN");


  const searchAmenities = (searchCriteria: string) => {
    if (!searchCriteria) {
      setAmenities([...filteredAmenities]);
      return;
    }
    const filtered = filteredAmenities.filter(
      (amenity) =>
        amenity.name.toLowerCase().includes(searchCriteria.toLowerCase()) ||
        amenity.description.toLowerCase().includes(searchCriteria.toLowerCase())
    );

    setAmenities(filtered);
  };

  const searchAmenitiesRoom = (searchCriteria: string) => {
    if (!searchCriteria) {
      setRoomAmenities([...filteredRoomAmenities]);
      return;
    }
    const filtered = filteredRoomAmenities.filter(
      (amenity) =>
        amenity.name.toLowerCase().includes(searchCriteria.toLowerCase()) ||
        amenity.description.toLowerCase().includes(searchCriteria.toLowerCase())
    );
    console.log("filtered", amenities);
    setRoomAmenities(filtered);
  };

 

  const getAmenities = async (hotelId: number) => {
    console.log(hotelId);
    try {
      const data = await fetch(`${baseUrl}/api/hotels/${hotelId}/amenities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => new Error("error in fetching amenities", err));
      console.log(data);
      setAmenities(data);
      setFilteredAmenities(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const getAmenitiesFromRoom = async (roomId: number) => {
    console.log(roomId);
    try {
      const data = await fetch(`${baseUrl}/api/rooms/${roomId}/amenities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch(
          (err) => new Error("Error in fetching amenities from room ", err)
        );
      setRoomAmenities(data);
      setFilteredRoomAmenities(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const addAmenityRoom = async (
    roomId: number,
    amenityInfo: {
      name: string;
      description: string;
    }
  ) => {
    try {
      const data = await fetch(`${baseUrl}/api/rooms/${roomId}/amenities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(amenityInfo),
      })
        .then((res) => res.json())
        .catch((err) => new Error("Error in adding new Amenity to room ", err));
      setRoomAmenities((prevAmenities) => [...prevAmenities, data]);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAmenityRoom = async (roomId: number, amenityId: number) => {
    console.log(roomId, amenityId);
    try {
      const data = await fetch(
        `${baseUrl}/api/rooms/${roomId}/amenities/${amenityId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => (res.status === 204 ? true : false))
        .catch(
          (err) => new Error("Error in deleting the amenity from room ", err)
        );
      setRoomAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity.id !== amenityId)
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditAmenityRoom = async (
    roomAmenityId: number,
    amenityInfo: {
      name: string;
      description: string;
    }
  ) => {
    console.log(roomAmenityId, amenityInfo);
    try {
      const data = fetch(`${baseUrl}/api/room-amenities/${roomAmenityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(amenityInfo),
      })
        .then((res) => (res.status === 204 ? true : false))
        .catch((err) => new Error("Error in updating the amenity ", err));
      setRoomAmenities((prevAmenities) =>
        prevAmenities.map((amenity) =>
          amenity.id === roomAmenityId
            ? { ...amenity, ...amenityInfo }
            : amenity
        )
      );
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAmenities = async (
    hotel: hotelObject,
    amenityId: number
  ) => {
    console.log("Attempting to delete:", hotel.id, hotel.name, amenityId);
    try {
      const data = await fetch(
        `${baseUrl}/api/hotels/${hotel.id}/amenities/${amenityId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => (res.status === 204 ? true : false))
        .catch((err) => new Error("error in deleting amenity", err));
      if (data) {
        setAmenities((prevAmenities) =>
          prevAmenities.filter(
            (amenity: AmenitiesInformation) => amenity.id !== amenityId
          )
        );
        console.log(amenities);
      } else {
        console.error("Delete failed. No data returned.");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const addAmenity = async (
    hotelId: number,
    amenityInfo: {
      name: string;
      description: string;
    }
  ) => {
    try {
      const data = await fetch(`${baseUrl}/api/hotels/${hotelId}/amenities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify({
          name: amenityInfo.name,
          description: amenityInfo.description,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => new Error("Error in adding new hotel", err));
      setAmenities((prevHotels) => {
        return [...prevHotels, data];
      });
      return data;
    } catch (err) {
      console.log("error in adding new hotels", err);
    }
  };

  return (
    <AmenitiesContext.Provider
      value={{
        handleDeleteAmenities,
        amenities,
        setAmenities,
        addAmenity,
        getAmenities,
        getAmenitiesFromRoom,
        addAmenityRoom,
        roomAmenities,
        handleDeleteAmenityRoom,
        handleEditAmenityRoom,
        searchAmenities,
        searchAmenitiesRoom,
      }}
    >
      {children}
    </AmenitiesContext.Provider>
  );
};

export const useAmenitiesContext = () => {
  return useContext(AmenitiesContext);
};
