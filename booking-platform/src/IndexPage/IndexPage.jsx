import HomeIcon from "@mui/icons-material/Home";
// import list from "./List";
import hotelImage from "./assets/HotelImage.jpg";
import desktopImage from "./assets/desktopImage.jpg";
const Header = () => {
  return (
    <header className=" flex flex-col gap-2 bg-blue-300 p-4 ">
      <a href="/" className="text-xl font-bold  flex items-center gap-2">
        <HomeIcon fontSize="large" />
        VBook
      </a>
    </header>
  );
};

const Main = () => {
  return (
    <main className="flex flex-col items-start my-8">
      <h1 className="text-2xl font-bold self-center mx-2 my-4">
        <i className="font-extrabold">VBook</i> <span>Hotel Booking </span>
      </h1>
      <div className=" w-11/12 mx-4 ">
        <picture className="w-full h-96 object-cover">
          <source media="(max-width: 799px)" srcSet={`${desktopImage} 800w`} />
          <source media="(min-width: 800px)" srcSet={`${hotelImage} 400w`} />
          <img
            className="w-full"
            src={desktopImage}
            alt="Chris standing up holding his daughter Elva"
          />
        </picture>
      </div>

      <article className="my-8">
        <h2 className="text-2xl mx-2">What do we offer?</h2>
        <p className="text-md mx-2 ">
          <i>
            Our company build for help people and decrease the effort and time
            on searching for Hotels in Wild World.{" "}
          </i>
        </p>
      </article>
    </main>
  );
};

export default function IndexPage() {
  return (
    <div className=" flex flex-col ">
      <Header />
      <Main />

      <footer></footer>
    </div>
  );
}
