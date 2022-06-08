import { ChartBar } from "phosphor-react";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";


export default function Insight3() {
    return (
        <BackgroundAreaDefault>
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
        </BackgroundAreaDefault>
    )
}