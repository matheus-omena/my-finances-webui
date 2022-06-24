import { useNavigate } from "react-router-dom";
import CircularProgress from "../../../components/General/CircularProgress";
import { ExpenseGroupWithGroupedExpensesModel } from "../../../models/ExpenseGroupModel";
import { getContrastColor } from "../../../utils";

interface ExpenseGroupData {
    group: ExpenseGroupWithGroupedExpensesModel;
}

export default function ExpenseGroup(data: ExpenseGroupData) {
    const { id, name, color, totalValue, paymentPercentual } = data.group;
    const navigate = useNavigate();

    let textColor = getContrastColor(color);

    return (
        <button type="button" onClick={() => navigate(`/expense-groups/${id}/expenses`)}>
            <div className={`p-3 rounded-2xl hover:saturate-200 hover:transition-all hover:-translate-y-1 hover:scale-100`} style={{ backgroundColor: color }}>
                <div className={`flex items-center justify-between text-[${textColor}]`}>
                    <span className="text-sm">
                        {name}
                    </span>
                    <div className="flex gap-3 items-center">
                        <span className="font-bold">R${totalValue.toFixed(2)}</span>
                        <div className="w-12 h-12">
                            <CircularProgress
                                value={paymentPercentual}
                                text={paymentPercentual ? `${paymentPercentual?.toFixed(0)}%` : "0%"}
                                textColor={getContrastColor(color)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}