import { Link, NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export function Header() {
  return (
    <nav className="sticky bg-[#171a18] text-gray-200">
      <div className="flex items-center justify-center gap-6 py-2 text-lg">
        <NavLink className="hover:underline" to={"/"}>
          Home
        </NavLink>
        <NavLink className="hover:underline" to={"/dashboard"}>
          Dashboard
        </NavLink>
        <Link to={"https://github.com/ritik48/tuf-frontend"} target="_blank">
          <FaGithub />
        </Link>
      </div>
    </nav>
  );
}
