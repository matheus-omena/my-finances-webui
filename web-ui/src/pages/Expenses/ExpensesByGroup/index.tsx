import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExpensesApi } from "../../../apis/ExpensesApi";
import Spinner from "../../../components/General/Spinner";
import { ExpenseModel } from "../../../models/ExpenseModel";

export default function ExpensesByGroup() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const _api = useMemo(() => new ExpensesApi(), []);
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState<ExpenseModel[]>();

    useEffect(() => {
        setLoading(true);
        _api
            .findByGroup(groupId!, 6)
            .then((r) => {
                setExpenses(r.data);
            })
            .catch((e) => console.log("Erro ao carregar despesas"))
            .finally(() => setLoading(false));
    }, [_api]);

    return (
        <>
            {
                loading ? <Spinner /> :
                expenses?.map((item, idx) => {
                    return (
                        <div key={idx}>
                            {item.name} ({item.value})
                        </div>
                    )
                })
            }
        </>
    );
}
