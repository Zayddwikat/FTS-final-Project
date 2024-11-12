import { useRouteError } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div
      id="error-page"
      className="w-screen flex flex-row place-items-start justify-center gap-4"
    >
      <icon>
        <ErrorOutlineIcon sx={{ fontSize: "5em" }} />
      </icon>
      <article>
        <h1 className="text-2xl font-medium">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {" "}
            <b className="text-xl">Page</b> {error.statusText || error.message}
          </i>
        </p>
      </article>
    </div>
  );
}
