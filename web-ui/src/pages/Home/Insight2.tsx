import { ChartPieSlice } from "phosphor-react";


export default function Insight2() {
    return (
        <div className="bg-[rgb(31,31,31)] p-5 rounded-2xl h-[302px]">
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Insights</span>
                    <span className="font-medium text-white">Gastos por Responsável</span>
                </div>
            </div>
            {/* Header */}
            <div className="flex justify-center">
                <ChartPieSlice size={200} weight="duotone" color="#d4d4d8"/>
            </div>
        </div>
    )
}