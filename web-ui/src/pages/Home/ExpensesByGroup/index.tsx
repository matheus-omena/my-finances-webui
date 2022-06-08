import { DotsThreeVertical } from "phosphor-react";
import BackgroundAreaDefault from "../../../components/General/BackgroundAreaDefault";
import ExpenseGroup from "./ExpenseGroup";

export function ExpensesByGroup() {
    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Balanço</span>
                    <span className="font-medium text-white">Grupos de despesas</span>
                </div>

                <button type="button">
                    <DotsThreeVertical color="#535353" weight="bold" size={30} />
                </button>
            </div>
            {/* Header */}
            <div className="flex flex-col gap-4">
                <ExpenseGroup id={""} name={"Despesas gerais"} value={2050} color={"#059669"} paymentPercentage={40} />
                <ExpenseGroup id={""} name={"Contas da empresa"} value={1540} color={"#1f2937"} paymentPercentage={75} />
                <ExpenseGroup id={""} name={"Renner"} value={600} color={"#f43f5e"} paymentPercentage={0} />
                <ExpenseGroup id={""} name={"Cartão Porto"} value={1700} color={"#0284c7"} paymentPercentage={100} />
                <ExpenseGroup id={""} name={"Cartão Itaú"} value={799} color={"#ea580c"} paymentPercentage={0} />
                <ExpenseGroup id={""} name={"Cartão NuBank"} value={350} color={"#9333ea"} paymentPercentage={0} />
                <ExpenseGroup id={""} name={"Cartão C6"} value={3600} color={"#18181b"} paymentPercentage={100} />
            </div>            
        </BackgroundAreaDefault>
    );
}