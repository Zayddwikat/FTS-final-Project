import {LoginForm} from "./component/LoginForm";
import HomeIcon from "@mui/icons-material/Home";

function LoginPage() {
  return (
    <main className=" flex flex-col w-dvw h-dvh ">
      <header className=" flex flex-row items-center  justify-between gap-2  p-10 ">
        <a href="/" className="text-2xl font-bold flex items-center gap-2">
          <HomeIcon fontSize="large" />
          VBook
        </a>
      </header>
      <main className=" h-full py-20 px-8 place-items-center   ">
        <div className="shadow border border-black p-8 rounded-md">
          <article className="mx-2">
            <h1 className="text-2xl bold italic">
              Sign in or create an account.
            </h1>
            <p className="text-xs bold">
              You can sign in using VBook account to access our service.
            </p>
          </article>
          <LoginForm passwordError={false} />
        </div>
      </main>
    </main>
  );
}

export default LoginPage;
