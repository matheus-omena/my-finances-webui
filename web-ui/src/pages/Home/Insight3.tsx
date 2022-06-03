import { ChartBar } from "phosphor-react";


export default function Insight3() {
    return (
        <div className="bg-[rgb(31,31,31)] p-5 rounded-2xl">
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Insights</span>
                    <span className="font-medium text-white">Gastos por Grupo</span>
                </div>
            </div>
            {/* Header */}
            <div className="flex justify-center">
                <ChartBar size={200} weight="duotone" color="#d4d4d8"/>
            </div>
        </div>
    )
}