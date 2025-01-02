import { baseUrl } from "../../const/constantVariables";

export const deleteCity = (cityId: number) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  const data = fetch(`${baseUrl}/api/cities/${cityId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => (res.status === 204 ? true : false))
    .catch((err) => new Error("Error in deleting city", err));
  return data;
};
