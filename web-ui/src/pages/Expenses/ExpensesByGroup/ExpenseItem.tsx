import moment from "moment";
import { ExpenseModel } from "../../../models/ExpenseModel"

type ExpenseProps = {
    expense: ExpenseModel;
}

export default function ExpenseItem(props: ExpenseProps) {
    const { expense } = props;
    return (
        <div className="bg-[#181818] p-3 rounded-2xl w-full cursor-pointer" onClick={() => alert('1')}>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-sm mb-2">{expense.name} (R${expense.value})</span>
                    <small className="text-zinc-500">Data para pagamento: {expense.paymentDay}/{expense.paymentMonth}</small>
                </div>
                {
                    expense.isPaid ?
                        <div className="flex flex-col items-end">
                            <small className="text-zinc-500">PAGO EM</small>
                            <strong className="text-xs">{moment(expense.dateItWasPaid).format("DD/MM/YYYY")}</strong>
                        </div> :
                        <button className="bg-zinc-100 text-zinc-700 text-sm font-bold rounded-lg p-2" onClick={() => alert('2')}>
                            PAGAR
                        </button>
                }
            </div>
        </div>
    )
}