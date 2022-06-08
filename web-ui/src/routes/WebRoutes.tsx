import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "../pages/Categories";
import Home from "../pages/Home/Home";

export default function WebRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                {/* <Route path="/categories/new" element={<NewCategory />} />
                <Route path="/categories/:id/edit" element={<EditCategory />} /> */}
                <Route path="/categories" element={<Categories />} />
                {/* <Route path="/*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}