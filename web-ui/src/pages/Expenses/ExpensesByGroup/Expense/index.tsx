import moment from "moment";
import { ExpenseModel } from "../../../../models/ExpenseModel"

type ExpenseProps = {
    expense: ExpenseModel;
}

export default function Expense(props: ExpenseProps) {
    const { expense } = props;
    return (
        <button className="bg-[rgb(31,31,31)] p-5 rounded-2xl mb-4 w-full" onClick={() => alert('1')}>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="mb-2">{expense.name} (R${expense.value})</span>
                    <small>Data de pagamento: {expense.paymentDay}/{expense.paymentMonth}</small>
                </div>
                <div>
                    {
                        expense.isPaid ?
                            <div className="flex flex-col items-end">
                                <small>PAGO EM</small>
                                <span>{moment(expense.dateItWasPaid).format("DD/MM/YYYY")}</span>
                            </div> :
                            <button className="bg-zinc-100 text-zinc-700 font-bold rounded-lg p-2" onClick={() => alert('2')}>
                                PAGAR
                            </button>                      
                    }
                </div>
            </div>
        </button>
    )
}