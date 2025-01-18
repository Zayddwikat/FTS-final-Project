import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { lazy, memo, useState } from "react";
import "../../../tailwindCss.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Snackbar } from "@mui/material";
import { CityInformation } from "../../../data_models/cities";
import { useSnakeBar } from "../../hooks/useSnackBar";
import { ImgObject } from "../../../user/hotelPage/component/hotelDetails/imageContainer/imageContainer";
import { LoadingScreen } from "../../../component/loadingPage";
import { ErrorPage } from "../../../ErrorPage";
import { Button } from "../../../login/loginForm/loginButton";
import { useImageContext } from "../context/imageContext";

const PaginationControls = memo(
  lazy(() => import("../../hotelPage/allHotel/paginationControls"))
);
const DeleteConfirmation = memo(
  lazy(() => import("../../component/deleteConfirmation"))
);
const AddImgDialog = memo(lazy(() => import("../addNewPhoto/addImageDialog")));

export const CityPhotos: React.FC<any> = () => {
  const { state } = useLocation();
  console.log(state);

  const city = state.data as CityInformation;
  console.log(city);

  const { openSnackBar, handleCloseSnackBar, action, setOpenSnackBar } =
    useSnakeBar();

  const [hovered, setHovered] = useState<Array<boolean>>([]);

  const handleHoveredImages = (index: number, isHovered: boolean) => {
    setHovered((prev) => {
      const updatedHovered = [...prev];
      updatedHovered[index] = isHovered;
      return updatedHovered;
    });
  };

  const { cityImages, getCityGallery, deleteCityImg } = useImageContext();

  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(0);

  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ImgObject | null>(null);

  const handleOpenConfirmDialog = (photo: ImgObject) => {
    setDeleteConfirmation(true);
    console.log("delete clicked");
    setSelectedPhoto(photo);
  };
  const handleCloseConfirmDialog = () => {
    setDeleteConfirmation(false);
    setSelectedPhoto(null);
  };

  const handleDeleteImg = async () => {
    if (selectedPhoto !== null) await deleteCityImg(city.id, selectedPhoto.id);
    setOpenSnackBar(true);
  };

  const handleOpenAddImgDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseAddImgDialog = () => {
    setOpenDialog(false);
  };

  const photoQuery = useQuery({
    queryKey: ["cityPhotos"],
    queryFn: async () => {
      await getCityGallery(city.id);
      return cityImages;
    },
  });

  console.log(photoQuery);

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const itemsPerPage = 8;
  const totalPages = Math.ceil(cityImages.length / itemsPerPage);
  var data = cityImages.slice(
    pageNum * itemsPerPage,
    (pageNum + 1) * itemsPerPage
  );

  if (photoQuery.isLoading) return <LoadingScreen />;
  if (photoQuery.error) return <ErrorPage />;

  return (
    <div className="w-full self-start mx-8 flex flex-col gap-8 ">
      <div className="flex flex-row w-full items-center justify-between   ">
        <h2 className="text-2xl mx-4">{city.name} Photos</h2>
        <Button
          color={""}
          size={""}
          value={"add Imag"}
          isSubmitting={false}
          handleClick={handleOpenAddImgDialog}
          className={"mr-10"}
          children={undefined}
          primary={true}
        />
        <AddImgDialog
          handleClose={handleCloseAddImgDialog}
          open={openDialog}
          city={city}
        />
      </div>
      <div className="mb-10 flex flex-col flex-wrap ">
        <div className="flex flex-wrap  h-[65dvh] gap-4 mr-10   p-4 ">
          {data?.map(
            (
              photo: {
                id: number;
                url: string;
              },
              index: number
            ) => (
              <div
                key={index}
                className={`relative w-[24%] h-[200px] flex flex-row flex-wrap gap-2 items-center justify-center`}
                onMouseEnter={() => handleHoveredImages(index, true)}
                onMouseLeave={() => handleHoveredImages(index, false)}
              >
                {hovered[index] && (
                  <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center">
                    <Button
                      color=""
                      size="small"
                      value=""
                      isSubmitting={false}
                      handleClick={() => handleOpenConfirmDialog(photo)}
                      className="z-10"
                      primary={false}
                    >
                      <DeleteForeverOutlinedIcon fontSize="large" />
                    </Button>
                  </div>
                )}
                <img
                  src={photo.url}
                  loading="lazy"
                  alt="City images"
                  onError={() => handleImageError(index)}
                  className={`w-full h-full object-cover ${
                    hovered[index] ? "opacity-10 pointer-events-none" : ""
                  }`}
                />
              </div>
            )
          )}
          <DeleteConfirmation
            open={deleteConfirmation}
            handleClose={handleCloseConfirmDialog}
            handleConfirm={() => {
              handleDeleteImg();
            }}
            setOpenSnackBar={setOpenSnackBar}
            label="Photo"
          />
        </div>

        <PaginationControls
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPages={totalPages}
        />
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={600}
        onClose={handleCloseSnackBar}
        message="Successfully deleted"
        action={action}
      />
    </div>
  );
};
