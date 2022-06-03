import CircularProgress from "../../../components/CircularProgress";

interface ExpenseGroupData {
    id: string;
    name: string;
    value: number;
    color: string;
    paymentPercentage: number;
}

export default function ExpenseGroup(data: ExpenseGroupData) {
    return (
        <button type="button">
            <div className={`p-3 rounded-2xl`} style={{ backgroundColor: data.color }}>
                <div className="flex items-center justify-between text-zinc-100">
                    <span className="text-sm">
                        {data.name}
                    </span>
                    <div className="flex gap-3 items-center">
                        <span className="font-bold">R${data.value},00</span>
                        <div className="w-12 h-12">
                            <CircularProgress
                                value={data.paymentPercentage}
                                text={`${data.paymentPercentage}%`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}