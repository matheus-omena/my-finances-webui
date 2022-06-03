import { CategoriesCard } from "./CategoriesCard";
import { ExpensesByGroup } from "./ExpensesByGroup";
import Insight1 from "./Insight1";
import Insight2 from "./Insight2";
import Insight3 from "./Insight3";
import { ResponsiblesCard } from "./ResponsiblesCard";


export default function Home() {
    return (
        <main className="container mx-auto md:px-5 py-5">
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2">
                    <h1 className="text-2xl font-bold mb-4">Geral</h1>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="grid grid-cols-1 gap-5">
                            <CategoriesCard />
                            <ResponsiblesCard />
                            <Insight1 />
                        </div>                        
                        <div className="flex flex-col gap-5">
                            <Insight2 />
                            <Insight3 />
                        </div>
                    </div>
                </div>


                <div className="col-span-1">
                    <h1 className="text-2xl font-bold mb-4">Despesas</h1>
                    <ExpensesByGroup />
                </div>
            </div>
        </main>
    );
}