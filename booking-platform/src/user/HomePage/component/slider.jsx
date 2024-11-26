import TripImg from "../../../assets/TripImg.jpg";

export default function Slider() {
  return (
    <main className="w-full h-[60dvh] flex flex-row items-center justify-between ">
      <div className="relative w-full h-full relative overflow-hidden ">
        <img
          src={TripImg}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          alt="Trip Img"
        />
      </div>
    </main>
  );
}
