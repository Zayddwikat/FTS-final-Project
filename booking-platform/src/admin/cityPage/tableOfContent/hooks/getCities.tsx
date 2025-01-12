export const getCities = ({
  name,
  searchQuery,
  pageSize,
  pageNumber,
}: {
  name?: string;
  searchQuery?: string;
  pageSize?: string;
  pageNumber?: string;
}) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  const queryParams = new URLSearchParams({
    name: name ?? "",
    searchQuery: searchQuery ?? "",
    pageSize: pageSize ?? "10",
    pageNumber: pageNumber ?? "1",
  });
  const data = fetch(
    `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities?${queryParams} `,
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
    .catch((err) => new Error("Error in Fetching the data", err));
  return data;
};
