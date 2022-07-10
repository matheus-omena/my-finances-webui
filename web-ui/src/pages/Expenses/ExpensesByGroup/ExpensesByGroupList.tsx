import { Modal } from "flowbite-react";
import moment from "moment";
import { Plus } from "phosphor-react";
import { useMemo, useState, useEffect, useCallback } from "react";
import { ExpenseGroupsApi } from "../../../apis/ExpenseGroupsApi";
import { ExpensesApi } from "../../../apis/ExpensesApi";
import GoBackButton from "../../../components/Form/GoBackButton";
import DefaultTransition from "../../../components/General/DefaultTransition";
import Spinner from "../../../components/General/Spinner";
import { ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import { ExpenseModel } from "../../../models/ExpenseModel";
import { OperationType } from "../../../models/RegistersEnums";
import ExpensesListItem from "./ExpensesListItem";
import EditExpense from "./Form/EditExpense";
import ExpenseFormModal from "./Form/ExpenseFormModal";

type ExpensesByGroupProps = {
    groupId: string;
    month: number;
    setExpenseGroupId: any;
}

export default function ExpensesByGroupList(props: ExpensesByGroupProps) {
    const _api = useMemo(() => new ExpensesApi(), []);
    const _apiExpenseGroup = useMemo(() => new ExpenseGroupsApi(), []);
    const [showModalForm, setShowModalForm] = useState(false);
    const [loadingExpenses, setLoadingExpenses] = useState(false);
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [expenses, setExpenses] = useState<ExpenseModel[]>();
    const [expenseGroup, setExpenseGroup] = useState<ExpenseGroupModel>();
    const [operationType, setOperationType] = useState<OperationType>(OperationType.CREATE);
    const [actualExpenseId, setActualExpenseId] = useState("");

    const actualMonth = Number(moment().format("MM"));

    const handleCreate = () => {
        setOperationType(OperationType.CREATE);
        setActualExpenseId("");
        setShowModalForm(true);
    }

    const handleEdit = (id: string) => {
        setOperationType(OperationType.EDIT);
        setActualExpenseId(id);
        setShowModalForm(true);
    }

    const loadRegisters = useCallback(() => {
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

    useEffect(() => {
        loadRegisters();
    }, [loadRegisters]);

    return (
        <DefaultTransition>
            <div className="mb-4">
                <GoBackButton onClick={() => props.setExpenseGroupId("")} />
            </div>
            {
                loadingGroup ?
                    <Spinner /> :
                    <div className="flex justify-between items-center mb-4">
                        <h5 className={"text-lg font-bold"} style={{ color: expenseGroup?.color }}>{expenseGroup?.name}</h5>

                        {
                            props.month === actualMonth &&
                            <button type="button" className="flex text-xs gap-2" onClick={handleCreate}>
                                Adicionar despesa
                                <Plus size={15} weight="bold" />
                            </button>
                        }
                    </div>
            }

            <div className="flex flex-col gap-4">
                {
                    loadingExpenses ?
                        <Spinner /> :
                        expenses?.length === 0 ?
                            <span>Esse grupo não possui despesas</span> :
                            expenses?.map((item) => {
                                return (
                                    <ExpensesListItem
                                        key={item.id}
                                        item={item}
                                        onEdit={handleEdit}
                                    />
                                )
                            })
                }
            </div>
            <ExpenseFormModal
                id={actualExpenseId}
                expenseGroup={expenseGroup!}
                operationType={operationType}
                showModalForm={showModalForm}
                onClose={() => setShowModalForm(false)}
                onFinish={() => {
                    setShowModalForm(false);
                    loadRegisters();
                }}
            />

        </DefaultTransition>
    );
}
