import PropTypes from "prop-types";
import { useState } from "react";
import { createContext, useContext } from "react";
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const onSearch = async ({
    checkIn,
    checkOut,
    city,
    starRate,
    numOfRooms,
    adults,
    childrenWithAdults,
  }) => {
    try {
      const queryParams = new URLSearchParams({
        checkInDate: checkIn,
        checkOutDate: checkOut,
        starRate: starRate?.toString(),
        city: city,
        numberOfRooms: numOfRooms?.toString(),
        children: childrenWithAdults?.toString(),
        adults: adults?.toString(),
      });
      const res = await fetch(
        `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/search?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setSearchResult(data);
      console.log(searchResult);
      return data;
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  };
  const onFeaturedDeals = async () => {
    try {
      await fetch(
        "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/featured-deals",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (res) => await res.json())
        .then((jsonResult) => {
          setFeaturedDeals(jsonResult);
        });
      return featuredDeals;
    } catch (error) {
      throw new Error("Error in fetching Deals", error);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        onSearch,
        searchResult,
        setSearchResult,
        onFeaturedDeals,
        featuredDeals,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export const useSearchContext = () => {
  return useContext(SearchContext);
};
SearchProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validates that 'children' is required and a valid React node
};
