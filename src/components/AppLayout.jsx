import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-black bg-opacity-85">
      <Header />
      <Outlet />
    </div>
  );
}
