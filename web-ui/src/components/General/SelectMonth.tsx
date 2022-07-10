import moment from "moment";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { months } from "../../models/Months";

type MonthsProps = {
    name: string;
    value: number;
}

type SelectMonthProps = {
   setMonth: (month: number) => void;
}

export default function SelectMonth(props: SelectMonthProps) {
    const { setMonth } = props;
    const [monthsExpenses, setMonthsExpenses] = useState<MonthsProps[]>();
    const [selectedMonth, setSelectedMonth] = useState<MonthsProps>();

    useEffect(() => {
        let actualMonth: number = Number(moment().format("MM"));
        let idx: number = months.findIndex(x => x.value === actualMonth);

        let monthsTemp: any = [];
        monthsTemp.push(months[idx - 1]);
        monthsTemp.push(months[idx]);
        monthsTemp.push(months[idx + 1]);

        setMonthsExpenses(monthsTemp);
        setSelectedMonth(monthsTemp[1]);
        setMonth(monthsTemp[1].value);
    }, [])

    const lastMonth = () => {
        let idx = monthsExpenses?.findIndex(x => x.value === selectedMonth?.value)!;
        if (idx > 0) {
            setSelectedMonth(monthsExpenses![idx - 1]);
            setMonth(monthsExpenses![idx - 1].value);
        }            
    }

    const nextMonth = () => {
        let idx = monthsExpenses?.findIndex(x => x.value === selectedMonth?.value)!;
        if (idx <= 2) {
            setSelectedMonth(monthsExpenses![idx + 1]);
            setMonth(monthsExpenses![idx + 1].value);
        }            
    }

    return (
        <div className="flex items-center justify-between my-5">
            <button
                type="button"
                className="bg-[#181818] hover:bg-zinc-50 transition-colors hover:text-[#181818] px-4 py-2 rounded-lg disabled:bg-[rgb(31,31,31)] disabled:text-[rgb(31,31,31)]"
                disabled={monthsExpenses?.findIndex(x => x.value === selectedMonth?.value)! === 0}
                onClick={lastMonth}
            >
                <CaretLeft size={15} weight="bold" />
            </button>
            <strong>{selectedMonth?.name}</strong>
            <button
                type="button"
                className="bg-[#181818] hover:bg-zinc-50 transition-colors hover:text-[#181818] px-4 py-2 rounded-lg disabled:bg-[rgb(31,31,31)] disabled:text-[rgb(31,31,31)]"
                disabled={monthsExpenses?.findIndex(x => x.value === selectedMonth?.value)! === 2}
                onClick={nextMonth}
            >
                <CaretRight size={15} weight="bold" />
            </button>
        </div>
    );
}