// HotelDetails.tsx
import Box from "@mui/material/Box";
import { FacilitiesList } from "./facilitiesList";
import { lazy, memo, Suspense } from "react";
import { LoadingScreen } from "../../../../component/loadingPage";

const HotelGalleryContainer = memo(
  lazy(() => import("./imageContainer/imageContainer"))
);

export const HotelDetails: React.FC<{ post: any; hotelData: any }> = ({
  post,
  hotelData,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full lg:w-2/3 px-4 py-6">
      <article className="flex flex-col items-start">
        <Box sx={{ pt: 1 }}>
          <h1 className="text-2xl font-bold">{hotelData.hotelName}</h1>
        </Box>
      </article>
      <Suspense fallback={<LoadingScreen />}>
        <div className="w-full h-[60vh] md:h-[65vh] lg:h-[50vh]">
          <HotelGalleryContainer post={post} />
        </div>
      </Suspense>

      <article className="mx-2 mb-4 text-sm">
        <p>{hotelData.description}</p>
      </article>

      <article className="mx-2 w-full">
        <h2 className="text-xl font-semibold">Most popular facilities</h2>
        <FacilitiesList dataArr={hotelData.amenities} />
      </article>
    </div>
  );
};
export default HotelDetails;
