import { baseUrl } from "../../const/constantVariables";

export const getCityInfo = (cityId: number, includeHotels: boolean) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  const data = fetch(
    `${baseUrl}/api/cities/${cityId}?includeHotels=${includeHotels}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  )
    .then((res) => res.json())
    .catch(
      (err) => new Error("Error n fetching data from server : error", err)
    );
  console.log("The data i n the fetch", data);
  return data;
};
