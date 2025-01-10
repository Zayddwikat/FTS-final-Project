import SimpleMap from "./googleMaps/googlemaps";
import { Reviews } from "./drawer";


export const HotelSidebar: React.FC<{ post: any; hotelData: any }> = ({ post, hotelData }) => {
  const calculateRating = () => {
    const rating = post.starRating || post.hotelStarRating;
    return rating * 2 > 9.5
      ? "Excellent"
      : rating * 2 > 8
      ? "Very Good"
      : rating * 2 > 6
      ? "Good"
      : "Traditional";
  };

  return (
    <article className="flex flex-col gap-4 w-full lg:w-1/3 bg-white border border-gray-300 p-4 rounded-md shadow-lg">
      <div className="flex justify-between items-center border-b pb-2">
        <p className="text-sm px-2 py-1 rounded-md">{calculateRating()}</p>
        <p className="text-md border text-white bg-blue-700 p-0.5 rounded-md">
          {post.starRating ? post.starRating * 2 : post.hotelStarRating * 2}
        </p>
      </div>

      <div className="flex justify-between items-center py-2 border-b">
        <h3 className="text-lg">Available Rooms</h3>
        <p className="bg-blue-600 text-white p-1 rounded-md">
          {hotelData.availableRooms}
        </p>
      </div>

      <SimpleMap lat={hotelData.latitude} lng={hotelData.longitude} />

      <div className="mt-4">
        <Reviews post={post} />
      </div>
    </article>
  );
};
