import { DotsThreeVertical, UserCircle } from "phosphor-react";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";

export function ResponsiblesCard() {
    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Cadastros</span>
                    <span className="font-medium text-white">Responsáveis</span>
                </div>

                <button type="button">
                    <DotsThreeVertical color="#535353" weight="bold" size={30} />
                </button>
            </div>
            {/* Header */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-row items-center gap-2">                    
                    <UserCircle size={30} weight="fill" color="#71717a" />
                    <span className="text-sm font-medium text-[#535353]">Matheus</span>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <UserCircle size={30} weight="fill" color="#71717a" />
                    <span className="text-sm font-medium text-[#535353]">Ingrid</span>
                </div>
            </div>
        </BackgroundAreaDefault>
    );
}