import { useEffect } from "react";
import { useSearchContext } from "../../Context/SearchContextApi";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export default function Deals() {
  const { featuredDeals, onFeaturedDeals } = useSearchContext();

  const handleClickedDeals = (elem) => {
    console.log("clicked" , elem.cityName );
  };

  useEffect(() => {
    onFeaturedDeals();
  }, []);
  return (
    <>
      <div className="flex flex-col items-start w-full mx-2 gap-4">
        <div className="flex flex-row items-center w-[98dvw]  justify-between  ">
          <h1 className="text-3xl">Deals</h1>
          <Link className="self-end mx-12" to={"/Show-more"}>
            <h1 className="text-sm text-blue-600 underline">show more</h1>
          </Link>
        </div>

        <div className="flex flex-row flex-wrap md:flex-nowrap w-full gap-4">
          {featuredDeals.map((elem, index) => (
            <div
              onClick={()=> handleClickedDeals(elem)}
              key={index}
              className="border p-2 border-black shadow rounded-md lg:w-[23dvw] md:w-[70dvw] md:flex-wrap  "
            >
              <div className=" w-full md:h-[40dvh] lg:h-[50dvh] md:flex-wrap h-[50dvh] ">
                <img
                  style={{
                    width: "100%",
                    height: "60%",
                    objectFit: "cover",
                  }}
                  src={elem.roomPhotoUrl}
                />
                <article className="flex flex-col  items-start  mx-2 my-1">
                  <div className="flex flex-row items-center justify-between  w-full   ">
                    <h2 className="text-lg text-bold">{elem.hotelName}</h2>
                    <p className="text-lg">{elem.cityName}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between  w-full   ">
                    <p className="text-md">{elem.title}</p>
                    <ReactStars edit={false} size={24} value={elem.hotelStarRating} />
                  </div>
                  <div className="flex flex-row items-center justify-between  w-full   ">
                    <p className="text-sm   line-clamp-2 ">
                      <i className="text-orange-600"> Description : </i>{" "}
                      {elem.description}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4 my-4 w-full   ">
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-sm line-through line-clamp-2 ">
                        <i className="text-orange-600"> Price /Night : </i>{" "}
                        {elem.originalRoomPrice}
                      </p>
                      <p className="text-orange-600 text-lg bold-lg">
                        {" "}
                        <i>{elem.finalPrice}</i>
                      </p>
                    </div>

                    <p className="text-orange-600 ">
                      {"Discount:  "}
                      <i>{elem.discount * 100 + `%`}</i>
                    </p>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
