import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <nav className="bg-[#171a18] text-gray-200">
            <div className="justify-center gap-6 py-2 text-lg flex">
                <NavLink className="hover:underline" to={"/"}>
                    Home
                </NavLink>
                <NavLink className="hover:underline" to={"/dashboard"}>
                    Dashboard
                </NavLink>
            </div>
        </nav>
    );
}
