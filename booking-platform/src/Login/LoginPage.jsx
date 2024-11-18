import LoginForm from "./component/LoginForm";

function LoginPage() {
  return (
    <main className=" flex flex-col w-dvw h-dvh">
      <header className="bg-blue-300">
        <a href="/" className="text-3xl m-4">
          VBook
        </a>
      </header>
      <main className=" h-full py-20 px-8 place-items-center ">
        <article className="mx-2">
          <h1 className="text-2xl bold italic">
            Sign in or create an account.
          </h1>
          <p className="text-xs bold">
            You can sign in using VBook account to access our service.
          </p>
        </article>
        <LoginForm />
      </main>
      <footer className="">@</footer>
    </main>
  );
}

export default LoginPage;
