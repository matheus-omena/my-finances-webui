import { SignOut } from "phosphor-react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CategoriesList from "../pages/Categories/CategoriesList";
import EditCategory from "../pages/Categories/EditCategory";
import NewCategory from "../pages/Categories/NewCategory";
import ExpenseGroups from "../pages/ExpenseGroups/ExpenseGroupsList";
import EditExpenseGroup from "../pages/ExpenseGroups/EditExpenseGroup";
import NewExpenseGroup from "../pages/ExpenseGroups/NewExpenseGroup";
import NewExpenseByGroup from "../pages/Expenses/ExpensesByGroup/NewExpense";
import Home from "../pages/Home/Home";
import Responsibles from "../pages/Responsibles/ResponsiblesList";
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
                
                {/* <Route path="/*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}