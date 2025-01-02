import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import MainPage from "./component/MainPage";
import Footer from "./component/Footer";
const Header = () => {
  return (
    <header className=" flex flex-row items-center  justify-between gap-2  p-10 ">
      <a href="/" className="text-2xl font-bold flex items-center gap-2">
        <HomeIcon fontSize="large" />
        VBook
      </a>
      <Link className="text-xl flex  items-center gap-2" to={`/login`}>
        Login
        <LoginIcon />
      </Link>
    </header>
  );
};

const Main = () => {
  return (
    <main className="flex flex-col items-start my-8">
      <h1 className="animated text-3xl text-slate-200 font-bold self-center mx-2 my-4">
        <span>Welcome to </span>
        <i className="font-extrabold">VBook</i> <span>Hotel Booking </span>
      </h1>
      {/* <div className=" w-11/12 mx-4 ">
        <picture className="w-full h-96 object-cover">
          <source media="(max-width: 799px)" srcSet={`${desktopImage} 800w`} />
          <source media="(min-width: 800px)" srcSet={`${hotelImage} 400w`} />
          <img
            className="w-full"
            src={desktopImage}
            alt="Chris standing up holding his daughter Elva"
          />
        </picture>
      </div> */}

      <article className="my-20 mx-8">
        <h2 className="text-3xl mx-10 mt-20 font-bold">
          No Matter where you're going to,
          <br /> we'll take you there
        </h2>
      </article>
    </main>
  );
};

export default function IndexPage() {
  return (
    <main>
      <div className="flex flex-col text-slate-50 ">
        <div className="img-cart h-screen">
          {" "}
          <Header />
          <Main />
        </div>
      </div>
      <div className="h-[100dvh] flex flex-col  justify-center">
        <MainPage />
        <Footer />
      </div>
    </main>
  );
}
