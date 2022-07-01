import moment from "moment";
import { Spinner } from "phosphor-react";
import { useMemo, useState, useEffect } from "react";
import { ExpenseGroupsApi } from "../../../apis/ExpenseGroupsApi";
import { ExpenseGroupWithGroupedExpensesModel } from "../../../models/ExpenseGroupModel";
import ExpenseGroup from "./ExpenseGroup";

type GroupExpensesListProps = {
    setExpenseGroupId: any;
}

export default function GroupExpensesList(props: GroupExpensesListProps) {
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const [loading, setLoading] = useState(false);
    const [expenseGroups, setExpenseGroups] = useState<ExpenseGroupWithGroupedExpensesModel[]>();

    useEffect(() => {
        setLoading(true);
        _api
            .findWithGroupedExpenses(Number(moment().format("MM")))
            .then((r) => setExpenseGroups(r.data))
            .catch((e) => console.log("Erro ao carregar os grupos de despesa", e))
            .finally(() => setLoading(false));
    }, [_api]);
    
    return (
        <div className="flex flex-col gap-4">
            {
                loading ? <Spinner /> :
                    expenseGroups?.map((item, idx) => {
                        return (
                            <ExpenseGroup key={idx} group={item} setExpenseGroupId={props.setExpenseGroupId}/>
                        );
                    })
            }
        </div>
    )
}