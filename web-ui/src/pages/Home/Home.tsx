import { CategoriesPreview } from "../Categories/CategoriesPreview";
import { ExpensesByGroupCard } from "./ExpensesByGroupCard";
import Insight1 from "./Insight1";
import Insight2 from "./Insight2";
import Insight3 from "./Insight3";
import { ResponsiblesPreview } from "../Responsibles/ResponsiblesPreview";


export default function Home() {
    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 sm:gap-0 xl:gap-5">
                <div className="sm:col-span-1 xl:col-span-2 order-2 sm:order-2 md:order-1 lg:order-1 xl:order-1 mb-5">
                    <h1 className="text-2xl font-bold mb-4">Geral</h1>
                    <div className="grid sm:col-span-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
                        <div className="grid grid-cols-1 gap-5">
                            <CategoriesPreview />
                            <ResponsiblesPreview />
                            <Insight1 />
                        </div>
                        <div className="flex flex-col gap-5">
                            <Insight2 />
                            <Insight3 />
                        </div>
                    </div>
                </div>

                <div className="col-span-1 order-1 sm:order-1 md:order-2 lg:order-2 xl:order-2 mb-5">
                    <h1 className="text-2xl font-bold mb-4">Despesas</h1>
                    <ExpensesByGroupCard />
                </div>
            </div>
        </>
    );
}