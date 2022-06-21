import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ExpenseGroupsApi } from "../../../apis/ExpenseGroupsApi";
import Spinner from "../../../components/General/Spinner";
import { ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import ExpenseGroupForm from "../ExpenseGroupForm";

export default function EditExpenseGroup() {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const [expenseGroup, setExpenseGroup] = useState<ExpenseGroupModel>();

    useEffect(() => {
        setLoading(true);

        if (id)
            _api.findById(id)
                .then(r => {
                    setExpenseGroup(r.data);                    
                })
                .catch(() => console.log("Erro ao carregar cadastro ", id))
                .finally(() => setLoading(false));
    }, [_api, id])

    return (
        <>
            {
                loading ? <Spinner /> :
                    <ExpenseGroupForm obj={expenseGroup} />
            }
        </>
    );
}