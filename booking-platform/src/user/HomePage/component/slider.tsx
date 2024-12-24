import TripImg from "../../../assets/TripImg.jpg";

export default function Slider() {
  return (
    <main className="w-dvw h-[60dvh] relative flex flex-row items-center justify-between  ">
      <div className="relative w-full h-full overflow-hidden ">
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
