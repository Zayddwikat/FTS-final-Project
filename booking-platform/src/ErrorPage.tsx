import { useRouteError } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const ErrorPage: React.FC = () => {
  const error = useRouteError();
  return (
    <div
      id="error-page"
      className="error-page w-screen flex flex-row place-items-start justify-center items-center gap-4"
    >
      <ErrorOutlineIcon sx={{ fontSize: "5em" }} />

      <article>
        <h1 className="text-2xl font-medium">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {" "}
            <b className="text-xl">Page</b>{" "}
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </i>
        </p>
      </article>
    </div>
  );
};
