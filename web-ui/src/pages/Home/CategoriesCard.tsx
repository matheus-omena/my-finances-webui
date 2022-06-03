import { DotsThreeVertical, Circle } from "phosphor-react";

export function CategoriesCard() {
    return (
        <div className="bg-[rgb(31,31,31)] p-5 rounded-2xl">
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Cadastros</span>
                    <span className="font-medium text-white">Categorias</span>
                </div>

                <button type="button">
                    <DotsThreeVertical color="#535353" weight="bold" size={30} />
                </button>
            </div>
            {/* Header */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-row items-center gap-2">
                    <Circle size={15} weight="fill" color="#ff6f69" />
                    <span className="text-sm font-medium text-[#535353]">Cartões</span>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Circle size={15} weight="fill" color="#ffcc5c" />
                    <span className="text-sm font-medium text-[#535353]">Casa</span>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Circle size={15} weight="fill" color="#ffeead" />
                    <span className="text-sm font-medium text-[#535353]">Estudo</span>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Circle size={15} weight="fill" color="#a8e6cf" />
                    <span className="text-sm font-medium text-[#535353]">Lazer</span>
                </div>
            </div>
        </div>
    );
}