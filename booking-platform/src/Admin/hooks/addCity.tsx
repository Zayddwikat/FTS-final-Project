export const addCity = ({
  cityName,
  cityDescription,
}: {
  cityName: string;
  cityDescription: string;
}) => {
  console.log(cityName);
  console.log(cityDescription);
  const token = localStorage.getItem("ADMIN_TOKEN");
  console.log(token);
  const data = fetch(
    `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify({
        name: cityName,
        description: cityDescription,
      }),
    }
  )
    .then((res) => res.json())
    .catch((err) => new Error("Error in fetching data ", err));
  return data;
};
