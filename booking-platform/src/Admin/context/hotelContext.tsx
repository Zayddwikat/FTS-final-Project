import { createContext, ReactNode, useContext, useState } from "react";
import { deleteHotel } from "../hooks/deleteHotelFromCity";
import { hotelObject } from "../component/CityInformationDrawer";
import { Anchor } from "../component/Drawer";
import { baseUrl } from "../../const/constantVariables";

export const HotelContext = createContext<any>([]);

export const HotelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hotels, setHotels] = useState<Array<hotelObject>>([]);

  const [state, setState] = useState({
    right: false,
  });

  const token = localStorage.getItem("ADMIN_TOKEN");

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log(`Toggling drawer: ${anchor}, Open: ${open}`);
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleDeleteHotel = async (hotel: hotelObject, cityId: number) => {
    console.log("Attempting to delete:", hotel.id, hotel.name, cityId);
    try {
      const data = await deleteHotel(hotel.id, cityId);
      if (data) {
        setHotels((prevHotels) =>
          prevHotels.filter((hot: hotelObject) => hot.id !== hotel.id)
        );
      } else {
        console.error("Delete failed. No data returned.");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const handleEditHotel = async (hotel: hotelObject, newHotel: hotelObject) => {
    console.log("Attempting to edit:", hotel.id, hotel.name);
    console.log(token);
    console.log(newHotel.starRating);

    try {
      const data = await fetch(`${baseUrl}/api/hotels/${hotel.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify({
          name: newHotel.name,
          description: newHotel.description,
          hotelType: newHotel.hotelType,
          starRating: newHotel.starRating / 2,
          latitude: newHotel.latitude,
          longitude: newHotel.longitude,
        }),
      })
        .then((res) => (res.status === 204 ? true : false))
        .catch((err) => new Error("Error in editing the hotel ", err));
      console.log(data);
      if (data) {
        setHotels((prevHotels) =>
          prevHotels.map((hot) =>
            hot.id === hotel.id
              ? {
                  ...hot,
                  name: newHotel.name,
                  description: newHotel.description,
                  hotelType: newHotel.hotelType,
                  starRating: newHotel.starRating / 2,
                  latitude: newHotel.latitude,
                  longitude: newHotel.longitude,
                }
              : hot
          )
        );
      }
      return data;
    } catch (err) {
      console.error("Error editing hotel:", err);
    }
  };
  const addHotels = async (hotel: hotelObject, cityId: number) => {
    try {
      const data = await fetch(`${baseUrl}/api/cities/${cityId}/hotels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify({
          name: hotel.name,
          description: hotel.description,
          hotelType: hotel.hotelType,
          starRating: hotel.starRating,
          latitude: hotel.latitude,
          longitude: hotel.longitude,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => new Error("Error in adding new hotel", err));
      setHotels((prevHotels) => {
        return [...prevHotels, data];
      });
      return data;
    } catch (err) {
      console.log("error in adding new hotels", err);
    }
  };

  return (
    <HotelContext.Provider
      value={{
        handleDeleteHotel,
        hotels,
        setHotels,
        state,
        toggleDrawer,
        handleEditHotel,
        addHotels,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotelContext = () => {
  return useContext(HotelContext);
};
