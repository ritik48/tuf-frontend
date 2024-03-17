/* eslint-disable no-unused-vars */
import { BrowserRouter, Form, NavLink, Outlet, Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function Home() {
    return (
        <div className="px-4 max-w-5xl h-3/4 mx-auto my-8 flex flex-col items-center">
            <h1 className="text-3xl">Enter details</h1>
            <form className="h-full w-full">
                <div className="mt-8 md:flex gap-10 h-full">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-lg">
                                Username
                            </label>
                            <input
                                id="username"
                                className="w-96 outline-none px-3 py-1.5 rounded-md text-xl border border-gray-500"
                                placeholder="username"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <label htmlFor="language" className="text-lg">
                                Preferred Language
                            </label>
                            <select
                                id="language"
                                className="border border-gray-500 rounded-md"
                            >
                                <option value={"C++"}>C++</option>
                                <option value={"Java"}>Java</option>
                                <option value={"Javascript"}>Javascript</option>
                                <option value={"Python"}>Python</option>
                                <option value={"C"}>C</option>
                                <option value={"Go"}>Go</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="stdin" className="text-lg">
                                Stdin
                            </label>
                            <textarea
                                id="stdin"
                                className="w-96 h-52 outline-none px-3 py-1.5 rounded-md text-xl border border-gray-500"
                                placeholder="Input"
                            />
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="flex flex-col h-full">
                            <label htmlFor="code" className="text-lg">
                                Code
                            </label>
                            <textarea
                                id="code"
                                className="bg-gray-100 text-md h-full outline-none px-3 py-1.5 rounded-md border border-gray-500"
                                placeholder="Input"
                            />
                        </div>
                    </div>
                </div>
                <button className="transition-all duration-300 hover:bg-green-900 text-lg bg-green-500 px-4 py-1 rounded-md text-white">
                    Submit
                </button>
            </form>
        </div>
    );
}

function Dashboard() {
    return <h1>Dashboard</h1>;
}

function Header() {
    return (
        <nav>
            <div className="border-gray-400 justify-center font-semibold gap-6 py-2 text-lg flex border">
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

function AppLayout() {
    return (
        <div className="h-screen">
            <Header />
            <Outlet />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
