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
    <div className="w-[50dvw] overflow-x-hidden ">
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
        <div className="w-full h-dvh flex flex-col gap-4 mx-4 items-center  ">
          {cityPhotos.data ? (
            <>
              <div className="flex flex-col justify-start gap-4 items-start  w-[90%] h-[40%]  ">
                <SwiperSection imgs={cityPhotos.data} />
              </div>
              <Link
                to={`/AdminHome/photos/city/:${city.id}`}
                state={{
                  data: city,
                }}
                className="text-blue-400 underline self-start"
              >
                all photos
              </Link>
              <Divider />
            </>
          ) : (
            <div className="w-11/12">
              <img
                src="https://oionline.com/wp-content/uploads/2018/03/notfound.jpg"
                alt="City image"
                style={{
                  width: "100%",
                  height: "80%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <article className="flex self-start items-center justify-between w-full gap-2">
            <div className="flex items-center gap-2">
              <p>City Name:</p>
              <h2 className="text-lg font-bold"> {cityInfoQuery.data.name}</h2>
            </div>
            <div className="">
              <Button
                children=""
                className="text-red-500"
                color={""}
                size={""}
                value={"Delete City"}
                isSubmitting={false}
                handleClick={() => handleOpenDialog()}
                primary={false}
              />
            </div>
            <DeleteConfirmation
              open={openDialog}
              handleClose={handleCloseDialog}
              handleConfirm={handleDeleteCities}
              setOpenSnackBar={setOpenSnackBar}
              label="City"
            />
          </article>
          <article className="self-start flex items-start w-full ">
            <p className="w-2/12">City description:</p>
            <h2 className="w-9/12 ">{cityInfoQuery.data.description}</h2>
          </article>

          <article className="self-start flex w-full flex-col justify-around  gap-2 my-4">
            <div className="flex flex-row justify-around">
              {includeHotels ? (
                <div className=" flex flex-row w-7/12 gap-4">
                  <p>
                    Number of Hotels: {hotels?.length > 0 ? hotels.length : 0}
                  </p>
                  <Button
                    color={""}
                    size={""}
                    value={"Manage Hotels"}
                    isSubmitting={false}
                    handleClick={() => {
                      navigate(`/AdminHome/Hotels/${city.name}`, {
                        replace: true,
                        state: {
                          data: hotels,
                          city: city,
                        },
                      });
                    }}
                    className={""}
                    children={undefined}
                    primary={false}
                  />
                </div>
              ) : null}
              <div
                className={`flex flex-row   items-center  ${
                  includeHotels
                    ? "justify-end w-3/12"
                    : "justify-end w-full mr-10"
                }  `}
              >
                <label className="" htmlFor="includeHotels">
                  Include Hotels:{" "}
                </label>
                <select
                  onChange={(e) => {
                    setIncludeHotels(e.target.value === "true" ? true : false);
                  }}
                  name="includeHotels"
                  id="includeHotels"
                >
                  <option value="false">false</option>
                  <option value="true">true</option>
                </select>
              </div>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                {includeHotels ? (
                  <>
                    <HotelCard city={city} setOpenSnackBar={setOpenSnackBar} />
                  </>
                ) : null}
              </ul>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
