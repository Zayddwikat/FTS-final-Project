import Skeleton from "@mui/material/Skeleton";

export const SkeletonAvailableRooms: React.FC = () => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <section className="w-full mb-12 px-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="bg-blue-400 border border-gray-300 px-2 py-1 text-xs md:text-sm">
              Room
            </th>
            <th className="bg-blue-400 border border-gray-300 px-2 py-1 text-xs md:text-sm">
              Capacity
            </th>
            <th className="bg-blue-400 border border-gray-300 px-2 py-1 text-xs md:text-sm">
              Amenities
            </th>
            <th className="bg-blue-400 border border-gray-300 px-2 py-1 text-xs md:text-sm">
              Price
            </th>
            <th className="bg-blue-400 border border-gray-300 px-2 py-1 text-xs md:text-sm">
              Reserve
            </th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="border border-gray-300 px-2 py-1">
                <Skeleton variant="text" width="70%" />
              </td>
              <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="40%" />
              </td>
              <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="70%" />
              </td>
              <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                <Skeleton variant="text" width="50%" />
              </td>
              <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={24}
                  className="rounded-md"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SkeletonAvailableRooms;
