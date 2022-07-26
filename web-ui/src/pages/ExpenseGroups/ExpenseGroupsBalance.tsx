import { Receipt } from "phosphor-react";
import { useMemo, useState, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { ExpenseGroupsApi } from "../../apis/ExpenseGroupsApi";
import DefaultTransition from "../../components/General/DefaultTransition";
import Spinner from "../../components/General/Spinner";
import { ExpenseGroupBalanceModel } from "../../models/ExpenseGroupModel";
import ExpenseGroupBalanceItem from "./ExpenseGroupBalanceItem";

type ExpenseGroupsBalanceProps = {
    setExpenseGroupId: any;
    month: number;
}

export default function ExpenseGroupsBalance(props: ExpenseGroupsBalanceProps) {
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const [loading, setLoading] = useState(false);
    const [expenseGroups, setExpenseGroups] = useState<ExpenseGroupBalanceModel[]>();

    useEffect(() => {
        setLoading(true);
        _api
            .balance(props.month)
            .then((r) => setExpenseGroups(r.data))
            .catch((e) => console.log("Erro ao carregar o balanço dos grupos de despesa", e))
            .finally(() => setLoading(false));
    }, [_api, props.month]);

    function sumBalance() {
        let sum: number = 0;
        expenseGroups?.map((item) => {
            sum = sum + item.totalValue
        })
        return (
            <div className="flex justify-center items-center gap-1 text-zinc-500">
                <Receipt size={18} weight="bold" />
                <span className="text-sm">Total: <strong>R${sum.toFixed(2)}</strong></span>
            </div>
        )
    }

    return (
        <DefaultTransition>
            <Scrollbars style={{ height: 560 }}>
                <div className="flex flex-col gap-4">
                    {
                        loading ? <Spinner /> :
                            expenseGroups?.length === 0 ?
                                <span>Sem grupos cadastrados</span> :
                                <>
                                    {
                                        expenseGroups?.map((item, idx) => {
                                            return (
                                                <ExpenseGroupBalanceItem key={idx} group={item} setExpenseGroupId={props.setExpenseGroupId} />
                                            );
                                        })
                                    }
                                </>
                    }
                </div>
            </Scrollbars>
            <div className="mt-3">
                {sumBalance()}
            </div>
        </DefaultTransition>
    )
}