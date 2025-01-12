import { useQuery } from "@tanstack/react-query";
import { getCityInfo } from "../../hooks/getCityInfo";
import { LoadingScreen } from "../../../component/loadingPage";
import { ErrorPage } from "../../../ErrorPage";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../../../login/loginForm/loginButton";
import { DeleteConfirmation } from "../../component/deleteConfirmation";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCityContext } from "../context/cityContext";
import { Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SwiperSection } from "../../photosPage/swiperSection";
import { CityInformation } from "../../../data_models/cities";
import { getCityPhotos } from "../../hooks/getCityPhotos";
import { useHotelContext } from "../../hotelPage/context/hotelContext";
import { HotelCard } from "../../hotelPage/hotelCard";
import CityPhotos from "./CityPhotos";
import CityDetails from "./CityDetails";
import HotelManagement from "./HotelManagement";
import DeleteCityDialog from "./DeleteCityDialog";
import IncludeHotelsSelector from "./IncludeHotelsSelector";
import HotelList from "./HotelList";

interface CityInformationProps {
  city: CityInformation;
  setCities: (prop: any) => void;
  toggleDrawer: (anchor: "right", right: boolean) => void;
  setOpenSnackBar: Dispatch<SetStateAction<boolean>>;
}

export interface hotelObject {
  map(arg0: (hot: any) => any): hotelObject;
  id: number;
  name: string;
  description: string;
  hotelType: number;
  starRating: number;
  latitude: number;
  longitude: number;
}

export const CityInformationDrawer: React.FC<CityInformationProps> = ({
  city,
  setCities,
  toggleDrawer,
  setOpenSnackBar,
}) => {
  const navigate = useNavigate();

  const [includeHotels, setIncludeHotels] = useState<boolean>(false);
  const { hotels, setHotels, setFilteredHotels } = useHotelContext();

  const { deleteCity } = useCityContext();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteCities = async () => {
    const data = await deleteCity(city.id);
    if (data) {
      toggleDrawer("right", false);
    } else {
      new Error("Error in deleting data");
    }
  };

  const cityInfoQuery = useQuery({
    queryKey: ["cityInfo", includeHotels],
    queryFn: async () => {
      console.log(includeHotels);
      const data = getCityInfo(city.id, includeHotels);
      setHotels(await data.then((res) => res.hotels));
      setFilteredHotels(await data.then((res) => res.hotels));
      console.log("Cities sets");

      return data;
    },
  });
  const cityPhotos = useQuery({
    queryKey: ["cityPhotos"],
    queryFn: async () => {
      return await getCityPhotos(city.id);
    },
  });
  console.log("city Photos ", cityPhotos.data);

  if (cityInfoQuery.isLoading) return <LoadingScreen />;
  if (cityInfoQuery.error)
    return (
      <>
        {" "}
        <ErrorPage />
      </>
    );

  return (
    <div className="w-[50dvw] overflow-x-hidden">
      <div className=" flex items-center justify-start  w-full">
        <Button
          color={""}
          size={"small"}
          value={""}
          isSubmitting={false}
          handleClick={() => toggleDrawer("right", false)}
          className={""}
          primary={false}
        >
          <CloseIcon />
        </Button>
      </div>
      {!cityInfoQuery.data?.name ? (
        <div className="flex w-full h-dvh items-center justify-center">
          The city Not Found
        </div>
      ) : (
        <div className="w-full h-dvh flex flex-col gap-4 mx-4 items-center">
          <CityPhotos city={city} cityPhotos={cityPhotos.data} />
          <CityDetails
            cityName={cityInfoQuery.data.name}
            cityDescription={cityInfoQuery.data.description}
            handleOpenDialog={handleOpenDialog}
          />
          <HotelManagement
            cityName={city.name}
            hotelsLength={hotels?.length || 0}
            navigateToHotelPage={() =>
              navigate(`/AdminHome/Hotels/${city.name}`, {
                replace: true,
                state: { data: hotels, city },
              })
            }
          />
          <DeleteCityDialog
            open={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleDeleteCities={handleDeleteCities}
            setOpenSnackBar={setOpenSnackBar}
          />
          <IncludeHotelsSelector
            includeHotels={includeHotels}
            setIncludeHotels={setIncludeHotels}
          />
          {includeHotels && (
            <HotelList
              setOpenSnackBar={setOpenSnackBar}
              hotels={hotels}
              cityId={city.id}
            />
          )}
        </div>
      )}
    </div>
  );
};
