import { useQuery } from "@tanstack/react-query";
import { LoadingScreen } from "../../../../component/LoadingPage";
import { ErrorPage } from "../../../../ErrorPage";
import { useLocation } from "react-router-dom";
import { roomInformation } from "../../../../classes/roomInformation";
import { getRoomGallery } from "../../../../user/HotelPage/Hooks/getRoomGallery";
import { useState } from "react";
import { Button } from "../../../../Login/component/LoginButton";
import { AddImgDialog } from "./addImageDialog";
import { useImageContext } from "../../../context/imageContext";
import "../../../../tailwindCss.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { ImgObject } from "../../../../user/HotelPage/component/imageContainer";
import { DeleteConfirmation } from "../../deleteConfirmation";
import { Snackbar } from "@mui/material";
import { useSnakeBar } from "../../../hooks/useSnakBar";

export const RoomPhotos: React.FC<any> = () => {
  const { state } = useLocation();
  console.log(state);

  const room = state.data as roomInformation;

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

  const { getRoomImage, images, handleDeleteImgFromRoom } = useImageContext();

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
    if (selectedPhoto !== null)
      await handleDeleteImgFromRoom(room.roomId, selectedPhoto.id);
    setOpenSnackBar(true);
  };

  const handleOpenAddImgDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseAddImgDialog = () => {
    setOpenDialog(false);
  };

  const photoQuery = useQuery({
    queryKey: ["roomPhotos"],
    queryFn: async () => await getRoomImage(room.roomId),
  });

  console.log(photoQuery);

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const itemsPerPage = 8;
  const totalPages = Math.ceil(images.length / itemsPerPage);
  var data = images.slice(pageNum * itemsPerPage, (pageNum + 1) * itemsPerPage);

  if (photoQuery.isLoading) return <LoadingScreen />;
  if (photoQuery.error) return <ErrorPage />;

  return (
    <div className="w-full self-start mx-8 flex flex-col gap-8 ">
      <div className="flex flex-row w-full items-center justify-between   ">
        <h2 className="text-2xl">Room Photos</h2>
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
          room={room}
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
                      size=""
                      value=""
                      isSubmitting={false}
                      handleClick={() => handleOpenConfirmDialog(photo)}
                      className="z-10 ml-2"
                      primary={false}
                    >
                      <DeleteForeverOutlinedIcon fontSize="large" />
                    </Button>
                  </div>
                )}
                <img
                  src={photo.url}
                  loading="lazy"
                  alt="room images"
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
        <div className="flex-1 justify-end self-end mr-10 mb-10">
          <button
            className={`px-3 py-1 mx-1 ${
              pageNum === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-400"
            }`}
            onClick={() => pageNum > 0 && setPageNum(pageNum - 1)}
            disabled={pageNum === 0}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <a
              key={index}
              onClick={() => setPageNum(index)}
              className={`px-3 py-1 mx-1 cursor-pointer ${
                pageNum === index
                  ? "text-white bg-blue-500 rounded"
                  : "text-blue-400"
              }`}
            >
              {index + 1}
            </a>
          ))}

          <button
            className={`px-3 py-1 mx-1 ${
              pageNum === totalPages - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-400"
            }`}
            onClick={() => pageNum < totalPages - 1 && setPageNum(pageNum + 1)}
            disabled={pageNum === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Successfully deleted"
        action={action}
      />
    </div>
  );
};
