import { loginImgs } from "../const/loginImg";
import { LoginForm } from "./loginForm/loginForm";
import HomeIcon from "@mui/icons-material/Home";
import { LoginSwiperSection } from "./loginImageSwiper/loginSwiperSection";
import { Divider } from "@mui/material";

function LoginPage() {
  return (
    <main className="flex flex-col w-screen h-screen">
      {/* Header */}
      <header className="flex flex-row items-center justify-between p-4 md:p-6 lg:p-10">
        <a href="/" className="text-2xl font-bold flex items-center gap-2">
          <HomeIcon fontSize="large" />
          VBook
        </a>
      </header>

      {/* Main Content */}
      <main className="border border-black h-auto md:h-[65dvh] w-[90dvw] lg:w-[70dvw] rounded-lg self-center flex flex-col md:flex-row items-center justify-center ">
        {/* Login Form Section */}
        <div className="flex flex-col items-start border shadow justify-center p-6 bg-white rounded-md w-full md:w-[40dvw] lg:w-[30dvw] order-2 h-[50dvh] md:order-1">
          <article className="mb-4">
            <h1 className="text-xl md:text-2xl font-bold italic">
              Sign in or create an account.
            </h1>
            <p className="text-sm md:text-base font-medium text-gray-600">
              You can sign in using your VBook account to access our service.
            </p>
          </article>
          <LoginForm passwordError={false} />
        </div>

        <div className="flex flex-row items-center justify-center w-full md:w-[60%] lg:w-[50%] rounded-md p-4 order-1 md:order-2 h-[60dvh]">
          <LoginSwiperSection imgs={loginImgs} noTitle={false} />
        </div>
      </main>
    </main>
  );
}

export default LoginPage;
