import moment from "moment";
import { ArrowsClockwise, ArrowSquareOut, Plus, PushPin } from "phosphor-react";
import { useMemo, useState, useEffect } from "react";
import { ExpenseGroupsApi } from "../../../apis/ExpenseGroupsApi";
import { ExpensesApi } from "../../../apis/ExpensesApi";
import GoBackButton from "../../../components/Form/GoBackButton";
import DefaultTransition from "../../../components/General/DefaultTransition";
import Spinner from "../../../components/General/Spinner";
import { ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import { ExpenseModel } from "../../../models/ExpenseModel";
import ExpenseItem from "./ExpenseItem";

type ExpensesByGroupProps = {
    groupId: string;
    month: number;
    setExpenseGroupId: any;
}

export default function ExpensesByGroupList(props: ExpensesByGroupProps) {
    const _api = useMemo(() => new ExpensesApi(), []);
    const _apiExpenseGroup = useMemo(() => new ExpenseGroupsApi(), []);
    const [loadingExpenses, setLoadingExpenses] = useState(false);
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [expenses, setExpenses] = useState<ExpenseModel[]>();
    const [expenseGroup, setExpenseGroup] = useState<ExpenseGroupModel>();

    const actualMonth = Number(moment().format("MM"));

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
                <GoBackButton onClick={() => props.setExpenseGroupId("")} />
            </div>
            {
                loadingGroup ?
                    <Spinner /> :
                    <div className="flex justify-between items-center mb-4">
                        <h5 className={"text-lg font-bold"} style={{ color: expenseGroup?.color }}>{expenseGroup?.name}</h5>

                        {
                            props.month === actualMonth ?
                                <button type="button" className="flex text-xs gap-2">
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
            {
                loadingExpenses ?
                    <Spinner /> :
                    expenses?.length === 0 ?
                        <span>Esse grupo não possui despesas</span> :
                        <div className="flex flex-col gap-4">
                            {
                                expenses?.map((item) => {
                                    return (
                                        <div key={item.id} className="bg-[#181818] p-3 rounded-2xl w-full">
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <div className="group flex items-center gap-1 text-sm mb-1 cursor-pointer hover:font-bold" /*onClick={() => handleEdit(item.id)}*/>
                                                        <span className="text-sm" onClick={() => alert('1')}>{item.name} (R${item.value})</span>
                                                        {/* <PushPin size={15} weight="fill" />                                                         */}
                                                        <ArrowSquareOut size={15} weight="bold" className="hidden group-hover:block group-hover:transition" />
                                                    </div>                                                    
                                                    <small className="text-zinc-500">Data para pagamento: {item.paymentDay}/{item.paymentMonth}</small>
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
            }
        </DefaultTransition>
    );
}
