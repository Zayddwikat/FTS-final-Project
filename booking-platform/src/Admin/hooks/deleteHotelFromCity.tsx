import { baseUrl } from "../../const/constantVariables";

export const deleteHotel = (hotelId: number, cityId: number) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  const data = fetch(`${baseUrl}/api/cities/${cityId}/hotels/${hotelId}`, {
    method: "DELETE",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      res.status === 204 ? true : false;
    })
    .catch((err) => new Error("Error on delete the hotel", err));
  return data;
};
