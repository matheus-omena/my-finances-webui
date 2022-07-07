import moment from "moment";
import { DotsThreeVertical } from "phosphor-react";
import { useEffect, useState } from "react";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import SelectMonth from "../../components/General/SelectMonth";
import ExpensesByGroupList from "../Expenses/ExpensesByGroup/ExpensesByGroupList";
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
    const [selectedMonth, setSelectedMonth] = useState<number>(Number(moment().format("MM")));

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
                    <>
                        <SelectMonth setMonth={setSelectedMonth} />
                        <ExpenseGroupsBalance month={selectedMonth} setExpenseGroupId={setGroupId} />
                    </> :
                viewType === ViewType.EXPENSES ?
                    <>
                        <SelectMonth setMonth={setSelectedMonth} />
                        <ExpensesByGroupList groupId={groupId} month={selectedMonth} setExpenseGroupId={setGroupId} />
                    </> :
                viewType === ViewType.GROUP_LIST ?
                    <ExpenseGroupsList onReload={() => setViewType(ViewType.BALANCE)} /> :
                    <></>
            }
        </BackgroundAreaDefault>
    );
}