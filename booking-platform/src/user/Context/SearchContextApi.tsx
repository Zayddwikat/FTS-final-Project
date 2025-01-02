import { any } from "prop-types";
import { ReactNode, useState } from "react";
import { createContext, useContext } from "react";
import { Dispatch, SetStateAction } from "react";

interface SearchParams {
  checkIn: string;
  checkOut: string;
  city: string;
  starRate?: number;
  numOfRooms?: number;
  adults?: number;
  childrenWithAdults?: number;
}
export interface SearchContextProps {
  onSearch: (params: SearchParams) => Promise<object>;
  onFeaturedDeals: () => Promise<object>;
  onRecentHotels: (userID: string) => Promise<object | null>;
  onDestinationTrending: () => Promise<object>;
  searchResult: object | null;
  featuredDeals: object | null;
  recentHotels: object | null;
  trendingHotels: object | null;
  setSearchResult: Dispatch<SetStateAction<object | null>>;
}

export const SearchContext = createContext<SearchContextProps | any>(any);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchResult, setSearchResult] = useState<object | null>([]);
  const [featuredDeals, setFeaturedDeals] = useState<object | null>([]);
  const [recentHotels, setRecentHotels] = useState<object | null>([]);
  const [trendingHotels, setTrendingHotels] = useState<object | null>([]);
  // const [searchParams, setSearchParams] = useState<object | null>({});
  const onSearch: any = async (params: any) => {
    try {
      const queryParams = new URLSearchParams({
        checkInDate: params.checkIn,
        checkOutDate: params.checkOut,
        starRate: params.starRate?.toString() ?? "",
        city: params.city,
        numberOfRooms: params.numOfRooms?.toString() ?? "",
        children: params.childrenWithAdults?.toString() ?? "",
        adults: params.adults?.toString() ?? "",
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
      // setSearchParams(params);
      return data;
    } catch (error: any) {
      console.error("Error during login:", error.message);
      throw error;
    }
  };
  const onFeaturedDeals = async () => {
    try {
      const data = await fetch(
        "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/featured-deals",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => await res.json());
      setFeaturedDeals(data);
      return data;
    } catch (error: any) {
      throw new Error("Error in fetching Deals", error);
    }
  };
  const onRecentHotels = async (userID: number): Promise<object | null> => {
    const token = process.env.USER_TOKEN;
    try {
      console.log("userID is : ", userID);
      const data = await fetch(
        `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/users/${userID}/recent-hotels`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
      return data;
    } catch (error: any) {
      throw new Error("Error in fetching data from the server", error);
    }
  };
  const onDestinationTrending = async () => {
    try {
      const data = await fetch(
        "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/destinations/trending",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => await res.json());
      setTrendingHotels(data);
      console.log("Log", data);
      return data;
    } catch (error: any) {
      throw new Error("Error in fetching data from the server", error);
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
        onRecentHotels,
        recentHotels,
        onDestinationTrending,
        trendingHotels,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export const useSearchContext = () => {
  return useContext(SearchContext);
};
