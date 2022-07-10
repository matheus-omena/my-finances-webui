import moment from "moment";
import { ArrowSquareOut, CalendarBlank, PushPin, Trash, UserCircle } from "phosphor-react";
import { ExpenseModel } from "../../../models/ExpenseModel";

type ExpensesListItemProps = {
    item: ExpenseModel;
    onEdit: (id: string) => void;    
}

export default function ExpensesListItem(props: ExpensesListItemProps) {
    const { item, onEdit } = props;

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
                        <div className="flex gap-1 text-sm" onClick={() => onEdit(item.id)}>
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
}