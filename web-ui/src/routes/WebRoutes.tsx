import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";

export default function WebRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}