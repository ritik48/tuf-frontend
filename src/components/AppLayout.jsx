import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function AppLayout() {
    return (
        <div className="h-screen">
            <Header />
            <Outlet />
        </div>
    );
}
