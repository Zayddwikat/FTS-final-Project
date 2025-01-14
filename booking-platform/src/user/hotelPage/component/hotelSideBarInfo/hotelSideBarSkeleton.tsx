import Skeleton from "@mui/material/Skeleton";

export const SkeletonHotelSidebar: React.FC = () => {
  return (
    <article className="flex flex-col gap-4 w-full lg:w-1/3 bg-white border border-gray-300 p-4 rounded-md shadow-lg">
      <div className="flex justify-between items-center border-b pb-2">
        <Skeleton
          variant="rectangular"
          width={80}
          height={24}
          className="rounded-md"
        />
        <Skeleton
          variant="rectangular"
          width={40}
          height={24}
          className="rounded-md"
        />
      </div>

      <div className="flex justify-between items-center py-2 border-b">
        <Skeleton variant="text" width="50%" />
        <Skeleton
          variant="rectangular"
          width={60}
          height={24}
          className="rounded-md"
        />
      </div>

      <div className="h-[200px] w-full border rounded-md">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>

      <div className="mt-4">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="70%" />
      </div>
    </article>
  );
};

export default SkeletonHotelSidebar;
