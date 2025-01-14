// SkeletonHotelDetails.tsx
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

const SkeletonFacilitiesList: React.FC = () => (
  <div className="flex flex-wrap gap-2">
    {[...Array(5)].map((_, index) => (
      <Skeleton
        key={index}
        variant="rectangular"
        width={80}
        height={20}
        className="rounded-md"
      />
    ))}
  </div>
);

const SkeletonGallery: React.FC = () => (
  <Skeleton
    variant="rectangular"
    className="w-full h-[60vh] md:h-[65vh] lg:h-[50vh]"
  />
);

export const SkeletonHotelDetails: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-full lg:w-2/3 px-4 py-6">
      <article className="flex flex-col items-start">
        <Box sx={{ pt: 1 }}>
          <Skeleton variant="text" width="60%" height={40} />
        </Box>
      </article>

      <SkeletonGallery />

      <article className="mx-2 mb-4 text-sm">
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="90%" height={20} />
        <Skeleton variant="text" width="95%" height={20} />
      </article>

      <article className="mx-2 w-full">
        <Skeleton variant="text" width="40%" height={30} />
        <SkeletonFacilitiesList />
      </article>
    </div>
  );
};

export default SkeletonHotelDetails;
