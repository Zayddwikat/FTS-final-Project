import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="flex flex-row gap-2 text-xl">
      What are you waiting{" "}
      <i className="text-blue-400 underline">
        <Link to={"/login"}> Join us </Link>{" "}
      </i>{" "}
      Now
    </footer>
  );
}
