import { DotsThreeVertical } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackgroundAreaDefault from "../../../components/General/BackgroundAreaDefault";
import ExpensesByGroup from "../../Expenses/ExpensesByGroup";
import GroupExpensesList from "./GroupExpensesList";

export function ExpensesByGroupCard() {    
    const [showDetailedExpenses, setShowDetailedExpenses] = useState(false);
    const [groupId, setGroupId] = useState("");

    useEffect(() => {
        setShowDetailedExpenses(groupId !== "");
    }, [groupId])

    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Balanço</span>
                    <span className="font-medium text-white">Grupos de despesas</span>
                </div>

                <Link to="/expense-groups">
                    <DotsThreeVertical color="#535353" weight="bold" size={30} />
                </Link>
            </div>
            {/* Header */}
            {
                showDetailedExpenses ? 
                <ExpensesByGroup groupId={groupId} month={7} setExpenseGroupId={setGroupId}/> :
                <GroupExpensesList setExpenseGroupId={setGroupId}/>
            }                  
        </BackgroundAreaDefault>
    );
}

{/* <ExpenseGroup id={""} name={"Despesas gerais"} value={2050} color={"#059669"} paymentPercentage={40} />
    <ExpenseGroup id={""} name={"Contas da empresa"} value={1540} color={"#1f2937"} paymentPercentage={75} />
    <ExpenseGroup id={""} name={"Renner"} value={600} color={"#f43f5e"} paymentPercentage={0} />
    <ExpenseGroup id={""} name={"Cartão Porto"} value={1700} color={"#0284c7"} paymentPercentage={100} />
    <ExpenseGroup id={""} name={"Cartão Itaú"} value={799} color={"#ea580c"} paymentPercentage={0} />
    <ExpenseGroup id={""} name={"Cartão NuBank"} value={350} color={"#9333ea"} paymentPercentage={0} />
    <ExpenseGroup id={""} name={"Cartão C6"} value={3600} color={"#18181b"} paymentPercentage={100} /> */}