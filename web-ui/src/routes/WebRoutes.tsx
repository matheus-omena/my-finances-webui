import { SignOut } from "phosphor-react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Categories from "../pages/Categories";
import EditCategory from "../pages/Categories/EditCategory";
import NewCategory from "../pages/Categories/NewCategory";
import ExpenseGroups from "../pages/ExpenseGroups";
import EditExpenseGroup from "../pages/ExpenseGroups/EditExpenseGroup";
import NewExpenseGroup from "../pages/ExpenseGroups/NewExpenseGroup";
import Home from "../pages/Home/Home";
import Responsibles from "../pages/Responsibles";
import EditResponsible from "../pages/Responsibles/EditResponsible";
import NewResponsible from "../pages/Responsibles/NewResponsible";

export default function WebRoutes() {
    const auth = useAuth();

    return (
        <BrowserRouter>
            <div className="flex justify-between mb-3">
                <Link to="/" className="font-extrabold text-2x text-red-500">Início</Link>
                <button onClick={auth.Logout} className="border border-zinc-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <SignOut size={20} weight="bold" />
                </button>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/categories/new" element={<NewCategory />} />
                <Route path="/categories/:id/edit" element={<EditCategory />} />
                <Route path="/categories" element={<Categories />} />

                <Route path="/responsibles/new" element={<NewResponsible />} />
                <Route path="/responsibles/:id/edit" element={<EditResponsible />} />
                <Route path="/responsibles" element={<Responsibles />} />

                <Route path="/expense-groups/new" element={<NewExpenseGroup />} />
                <Route path="/expense-groups/:id/edit" element={<EditExpenseGroup />} />
                <Route path="/expense-groups" element={<ExpenseGroups />} />
                {/* <Route path="/*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}