import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "../pages/Categories";
import EditCategory from "../pages/Categories/EditCategory";
import NewCategory from "../pages/Categories/NewCategory";
import Home from "../pages/Home/Home";

export default function WebRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                {/* <Route path="/categories/new" element={<NewCategory />} />
                <Route path="/categories/:id/edit" element={<EditCategory />} /> */}
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/new" element={<NewCategory />} />
                <Route path="/categories/:id/edit" element={<EditCategory />} />
                {/* <Route path="/*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}