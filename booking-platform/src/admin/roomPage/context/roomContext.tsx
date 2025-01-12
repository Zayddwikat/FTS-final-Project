import { createContext, ReactNode, useContext, useState } from "react";
import { roomInformation } from "../../../data_models/roomInformation";
import { baseUrl } from "../../../const/constantVariables";


export const RoomContext = createContext<any>([]);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rooms, setRoom] = useState<Array<roomInformation>>([]);
  const token = localStorage.getItem("ADMIN_TOKEN");

  const getRooms = async ({ hotel, checkIn, checkOut }) => {
    const str = `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${
      hotel.hotelId ?? hotel.id
    }/rooms?checkInDate=${checkIn
      .split("-")
      .reverse()
      .join("-")}&CheckOutDate=${checkOut.split("-").reverse().join("-")}`;
    console.log(str);
    const data = await fetch(str, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    })
      .then(async (res) => await res.json())
      .catch((err) => new Error("Error in fetching Data ", err));
    console.log(data);
    setRoom(data);
    return data;
  };

  const addRoom = async (hotelId, roomInfo) => {
    console.log(hotelId);
    console.log(roomInfo);

    try {
      const data = await fetch(`${baseUrl}/api/hotels/${hotelId}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify({
          roomNumber: roomInfo.roomNumber,
          cost: roomInfo.cost,
        }),
      })
        .then((res) => res.json())
        .catch((err) => new Error("Error in adding new Room", err));
      setRoom((prevRooms) => {
        if (prevRooms.some((room) => room.roomId === data.id)) {
          console.warn(`Room with ID ${data.id} already exists.`);
          return prevRooms;
        }
        return [
          ...prevRooms,
          { roomId: data.id, roomNumber: data.roomNumber, price: data.cost },
        ];
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRoom = async (hotelId: number, roomId: number) => {
    try {
      const data = await fetch(
        `${baseUrl}/api/hotels/${hotelId}/rooms/${roomId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token} `,
          },
        }
      )
        .then((res) => (res.status === 204 ? true : false))
        .catch((err) => new Error("Error in deleting Room", err));
      setRoom((prevRooms) =>
        prevRooms.filter((room) => room.roomId !== roomId)
      );
    } catch (err) {
      console.log(err);
    }
  };
  const editRoom = async (roomId: number, roomInfo) => {
    console.log(roomId);
    console.log(roomInfo);
    try {
      const data = fetch(`${baseUrl}/api/rooms/${roomId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify({
          roomNumber: roomInfo.roomNumber,
          cost: roomInfo.cost,
        }),
      })
        .then((res) => (res.status === 204 ? true : false))
        .catch((err) => {
          new Error("Error in editing room", err);
          return false;
        });
      setRoom((prevRooms) => {
        const roomExists = prevRooms.some((room) => room.roomId === roomId);
        if (!roomExists) {
          console.error(`Room with ID ${roomId} not found.`);
          return prevRooms;
        }
        return prevRooms.map((room) =>
          room.roomId === roomId
            ? { ...room, roomNumber: roomInfo.roomNumber, price: roomInfo.cost }
            : room
        );
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <RoomContext.Provider
      value={{
        getRooms,
        rooms,
        addRoom,
        deleteRoom,
        editRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  return useContext(RoomContext);
};
