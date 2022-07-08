import { Modal } from "flowbite-react";
import moment from "moment";
import { ArrowsClockwise, ArrowSquareOut, CalendarBlank, Plus, PushPin, UserCircle } from "phosphor-react";
import { useMemo, useState, useEffect, useCallback } from "react";
import { ExpenseGroupsApi } from "../../../apis/ExpenseGroupsApi";
import { ExpensesApi } from "../../../apis/ExpensesApi";
import GoBackButton from "../../../components/Form/GoBackButton";
import DefaultTransition from "../../../components/General/DefaultTransition";
import Spinner from "../../../components/General/Spinner";
import { ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import { ExpenseModel } from "../../../models/ExpenseModel";
import { OperationType } from "../../../models/RegistersEnums";
import EditExpense from "./EditExpense";
import NewExpense from "./NewExpense";

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
                            props.month === actualMonth ?
                                <button type="button" className="flex text-xs gap-2" onClick={handleCreate}>
                                    Adicionar despesa
                                    <Plus size={15} weight="bold" />
                                </button> :
                                // props.month === (actualMonth + 1) ?
                                //     <button type="button" className="flex text-xs gap-2">
                                //         Processar despesas
                                //         <ArrowsClockwise size={15} weight="bold" />
                                //     </button> :
                                <></>

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
                                    <div key={item.id} className="bg-[#181818] p-3 rounded-2xl w-full relative">
                                        {
                                            item.fixedExpenseId &&
                                            <div className="absolute -right-2 -top-2">
                                                <PushPin size={18} weight="fill" color="#ef4444" />
                                            </div>
                                        }
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <div className="group flex items-center gap-1 text-sm mb-1 cursor-pointer hover:font-bold">
                                                    <div className="flex gap-1 text-sm" onClick={() => handleEdit(item.id)}>
                                                        <span>
                                                            {`${item.name} ${item.totalInstallments ? `(${item.currentInstallment}/${item.totalInstallments}) ` : ' '}`}
                                                            <strong>R${item.value}</strong>
                                                        </span>
                                                    </div>
                                                    <ArrowSquareOut size={15} weight="bold" className="hidden group-hover:block group-hover:transition" />
                                                </div>
                                                <div className="flex items-center gap-1 text-zinc-500 mb-1">
                                                    <CalendarBlank size={12} />
                                                    <small className="text-xs">Data para pagamento: <strong>{item.paymentDay}/{item.paymentMonth}</strong></small>
                                                </div>
                                                <div className="flex items-center gap-1 text-zinc-500">
                                                    <UserCircle size={12} weight="fill" />
                                                    <small className="text-xs">Responsável: <strong>{item.responsible.name}</strong></small>
                                                </div>
                                            </div>
                                            {
                                                item.isPaid ?
                                                    <div className="flex flex-col items-end">
                                                        <small className="text-zinc-500">PAGO EM</small>
                                                        <strong className="text-xs">{moment(item.dateItWasPaid).format("DD/MM/YYYY")}</strong>
                                                    </div> :
                                                    <button className="bg-zinc-100 text-zinc-700 text-sm font-bold rounded-lg p-2" onClick={() => alert('2')}>
                                                        PAGAR
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                }
            </div>
            <Modal
                show={showModalForm}
                size="lg"
                popup={true}
                onClose={() => setShowModalForm(false)}
                color="#0f172a"
            >
                <div className="bg-zinc-800 rounded-md">
                    <Modal.Header />
                    <Modal.Body>
                        {
                            operationType === OperationType.CREATE ?
                                <NewExpense
                                    expenseGroup={expenseGroup!}
                                    onFinish={() => {
                                        setShowModalForm(false);
                                        loadRegisters();
                                    }}
                                /> :
                                <EditExpense
                                    id={actualExpenseId}
                                    expenseGroup={expenseGroup!}
                                    onFinish={() => {
                                        setShowModalForm(false);
                                        loadRegisters();
                                    }}
                                />
                        }
                    </Modal.Body>
                </div>
            </Modal>

        </DefaultTransition>
    );
}
