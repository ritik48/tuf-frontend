/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Home } from "./components/Home";
import { AppLayout } from "./components/AppLayout";
import { Dashboard } from "./components/Dashboard";

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
