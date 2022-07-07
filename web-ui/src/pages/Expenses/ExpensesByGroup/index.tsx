import { ArrowCircleLeft, Plus } from "phosphor-react";
import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExpenseGroupsApi } from "../../../apis/ExpenseGroupsApi";
import { ExpensesApi } from "../../../apis/ExpensesApi";
import GoBackButton from "../../../components/Form/GoBackButton";
import DefaultTransition from "../../../components/General/DefaultTransition";
import Spinner from "../../../components/General/Spinner";
import { ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import { ExpenseModel } from "../../../models/ExpenseModel";
import Expense from "./Expense";

type ExpensesByGroupProps = {
    groupId: string;
    month: number;
    setExpenseGroupId: any;
}

export default function ExpensesByGroup(props: ExpensesByGroupProps) {    
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
            .findByGroup(props.groupId, props.month)
            .then((r) => {
                setExpenses(r.data);
            })
            .catch((e) => console.log("Erro ao carregar despesas"))
            .finally(() => setLoadingExpenses(false));

        setLoadingGroup(true);
        _apiExpenseGroup
            .findById(props.groupId)
            .then((r) => {
                setExpenseGroup(r.data);
            })
            .catch((e) => console.log("Erro ao carregar grupo de despesas"))
            .finally(() => setLoadingGroup(false));
    }, [_api, _apiExpenseGroup, props.month]);

    return (
        <DefaultTransition>            
            <div className="mb-4">
                <GoBackButton onClick={() => props.setExpenseGroupId("")}/>
            </div>
            {
                loadingGroup ?
                    <Spinner /> :
                    <div className="flex justify-between items-center mb-4">
                        <h5 className={"text-lg font-bold"} style={{ color: expenseGroup?.color }}>{expenseGroup?.name}</h5>

                        <button
                            type="submit"
                            onClick={() => navigate(`/expenses/new/bygroup/${props.groupId}`)}
                            className="flex text-xs gap-2"
                        >
                            Adicionar despesa
                            <Plus size={15} weight="bold" />
                        </button>
                    </div>                    
            }
            {
                loadingExpenses ?
                    <Spinner /> :
                    expenses?.length === 0 ?
                    <span>Esse grupo não possui despesas</span> : 
                    <div className="flex flex-col gap-4">
                        {
                            expenses?.map((item, idx) => {
                                return (
                                    <Expense key={idx} expense={item}/>                            
                                )
                            })
                        }                        
                    </div>
            }
        </DefaultTransition>
    );
}
