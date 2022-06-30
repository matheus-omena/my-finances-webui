import { Plus } from "phosphor-react";
import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExpenseGroupsApi } from "../../../apis/ExpenseGroupsApi";
import { ExpensesApi } from "../../../apis/ExpensesApi";
import Spinner from "../../../components/General/Spinner";
import { ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import { ExpenseModel } from "../../../models/ExpenseModel";
import Expense from "./Expense";

export default function ExpensesByGroup() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const _api = useMemo(() => new ExpensesApi(), []);
    const _apiExpenseGroup = useMemo(() => new ExpenseGroupsApi(), []);
    const [loadingExpenses, setLoadingExpenses] = useState(false);
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [expenses, setExpenses] = useState<ExpenseModel[]>();
    const [expenseGroup, setExpenseGroup] = useState<ExpenseGroupModel>();

    useEffect(() => {
        setLoadingExpenses(true);
        _api
            .findByGroup(groupId!, 6)
            .then((r) => {
                setExpenses(r.data);
            })
            .catch((e) => console.log("Erro ao carregar despesas"))
            .finally(() => setLoadingExpenses(false));

        setLoadingGroup(true);
        _apiExpenseGroup
            .findById(groupId!)
            .then((r) => {
                setExpenseGroup(r.data);
            })
            .catch((e) => console.log("Erro ao carregar grupo de despesas"))
            .finally(() => setLoadingGroup(false));
    }, [_api, _apiExpenseGroup]);

    return (
        <>
            {
                loadingGroup ?
                    <Spinner /> :
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold mb-4">{expenseGroup?.name}</h1>

                        <button
                            type="submit"
                            onClick={() => navigate(`/expenses/new/bygroup/${groupId}`)}
                        >
                            <Plus size={25} weight="bold" />
                        </button>
                    </div>                    
            }
            {
                loadingExpenses ?
                    <Spinner /> :
                    expenses?.length === 0 ?
                    <span>Esse grupo não possui despesas</span> : 
                    expenses?.map((item, idx) => {
                        return (
                            <Expense key={idx} expense={item}/>                            
                        )
                    })
            }
        </>
    );
}
