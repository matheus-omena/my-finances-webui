import { DotsThreeVertical } from "phosphor-react";
import { useEffect, useState } from "react";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import ExpensesByGroup from "../Expenses/ExpensesByGroup";
import ExpenseGroupsBalance from "./ExpenseGroupsBalance";
import ExpenseGroupsList from "./ExpenseGroupsList";

enum ViewType {
    BALANCE = "balance",
    GROUP_LIST = "group_list",
    EXPENSES = "expenses"
}

export function ExpenseGroupsPreview() {        
    const [viewType, setViewType] = useState<ViewType>(ViewType.BALANCE);
    const [groupId, setGroupId] = useState("");

    useEffect(() => {
        setViewType(ViewType.BALANCE);
    }, [])

    useEffect(() => {
        setViewType(groupId !== "" ? ViewType.EXPENSES : ViewType.BALANCE);
    }, [groupId])

    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Balanço</span>
                    <span className="font-medium text-white">
                        {
                            viewType === ViewType.EXPENSES ? "Despesas" : "Grupos de despesa"
                        }
                    </span>
                </div>

                <button type="button" onClick={() => setViewType(ViewType.GROUP_LIST)}>
                    <DotsThreeVertical color="#535353" weight="bold" size={30} />
                </button>
            </div>
            {/* Header */}            
            {
                viewType === ViewType.BALANCE ? 
                    <ExpenseGroupsBalance setExpenseGroupId={setGroupId}/> :
                viewType === ViewType.EXPENSES ? 
                    <ExpensesByGroup groupId={groupId} month={7} setExpenseGroupId={setGroupId}/> :
                viewType === ViewType.GROUP_LIST ? 
                    <ExpenseGroupsList onReload={() => setViewType(ViewType.BALANCE)}/> :
                <></>                           
            }                  
        </BackgroundAreaDefault>
    );
}