import moment from "moment";
import { Spinner } from "phosphor-react";
import { useMemo, useState, useEffect } from "react";
import { ExpenseGroupsApi } from "../../apis/ExpenseGroupsApi";
import DefaultTransition from "../../components/General/DefaultTransition";
import { ExpenseGroupBalanceModel } from "../../models/ExpenseGroupModel";
import ExpenseGroupBalanceItem from "./ExpenseGroupBalanceItem";

type ExpenseGroupsBalanceProps = {
    setExpenseGroupId: any;
}

export default function ExpenseGroupsBalance(props: ExpenseGroupsBalanceProps) {
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const [loading, setLoading] = useState(false);
    const [expenseGroups, setExpenseGroups] = useState<ExpenseGroupBalanceModel[]>();

    useEffect(() => {
        setLoading(true);
        _api
            .balance(Number(moment().format("MM")))
            .then((r) => setExpenseGroups(r.data))
            .catch((e) => console.log("Erro ao carregar o balanço dos grupos de despesa", e))
            .finally(() => setLoading(false));
    }, [_api]);
    
    return (
        <DefaultTransition className="flex flex-col gap-4">
            {
                loading ? <Spinner /> :
                    expenseGroups?.map((item, idx) => {
                        return (
                            <ExpenseGroupBalanceItem key={idx} group={item} setExpenseGroupId={props.setExpenseGroupId}/>
                        );
                    })
            }
        </DefaultTransition>
    )
}