import { createContext, ReactNode, useContext, useState } from "react";
import { CityInformation } from "../../classes/Cities";
import { baseUrl } from "../../const/constantVariables";

export const CityContext = createContext<any>([]);

export const CityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cities, setCities] = useState<Array<CityInformation>>([]);
  const [filteredCities, setFilteredCities] = useState<Array<CityInformation>>(
    []
  );
  const toke = localStorage.getItem("ADMIN_TOKEN");

  const getCities = async ({
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
    console.log("in get Cities");

    const token = localStorage.getItem("ADMIN_TOKEN");
    const queryParams = new URLSearchParams({
      name: name ?? "",
      searchQuery: searchQuery ?? "",
      pageSize: pageSize ?? "10",
      pageNumber: pageNumber ?? "1",
    });
    const data = await fetch(
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
    setCities(data);
    setFilteredCities(data);
    return data;
  };

  const addCity = async ({
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
    const data = await fetch(`${baseUrl}/api/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify({
        name: cityName,
        description: cityDescription,
      }),
    })
      .then((res) => res.json())
      .catch((err) => new Error("Error in fetching data ", err));
    setCities([...cities, data]);
    setFilteredCities([...filteredCities, data]);
    return data;
  };

  const deleteCity = async (cityId: number) => {
    const token = localStorage.getItem("ADMIN_TOKEN");
    const data = await fetch(`${baseUrl}/api/cities/${cityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => (res.status === 204 ? true : false))
      .catch((err) => new Error("Error in deleting city", err));
    setCities(cities.filter((city) => city.id !== cityId));
    setFilteredCities(filteredCities.filter((city) => city.id !== cityId));
    return data;
  };

  const searchCities = (searchCriteria: string) => {
    console.log(cities);
    if (!searchCriteria) {
      setCities([...filteredCities]);
      return;
    }
    const filtered = filteredCities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchCriteria.toLowerCase()) ||
        city.description.toLowerCase().includes(searchCriteria.toLowerCase())
    );
    setCities(filtered);
  };
  return (
    <CityContext.Provider
      value={{
        cities,
        searchCities,
        getCities,
        addCity,
        deleteCity,
        setCities,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCityContext = () => {
  const context = useContext(CityContext);
  return context;
};
