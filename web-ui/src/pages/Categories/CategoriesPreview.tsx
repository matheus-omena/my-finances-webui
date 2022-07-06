import { DotsThreeVertical, Folders } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CategoriesApi } from "../../apis/CategoriesApi";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import DefaultTransition from "../../components/General/DefaultTransition";
import Spinner from "../../components/General/Spinner";
import { CategoryModel } from "../../models/CategoryModel";
import { ViewMode } from "../../models/RegistersEnums";
import CategoriesList from "./CategoriesList";

export function CategoriesPreview() {
    const _api = useMemo(() => new CategoriesApi(), []);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>();
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.PREVIEW);

    const loadRegisters = useCallback(() => {
        setViewMode(ViewMode.PREVIEW);
        setLoading(true);
        _api
            .find()
            .then((r) => {
                setCategories(r.data);
            })
            .catch((e) => console.log("Erro ao carregar as categorias"))
            .finally(() => setLoading(false));
    }, [_api]);

    useEffect(() => {
        loadRegisters();
    }, [loadRegisters]);

    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Cadastros</span>
                    <span className="font-medium text-white">Categorias</span>
                </div>

                <button onClick={() => setViewMode(ViewMode.LIST)}>
                    <DotsThreeVertical color="#535353" weight="bold" size={30} />
                </button>
            </div>

            {/* Header */}

            {
                loading ? <Spinner /> :
                    viewMode === ViewMode.PREVIEW ?
                        <DefaultTransition className="grid grid-cols-2 gap-3">
                            {
                                categories?.map((item, idx) => {
                                    return (
                                        <div key={idx} className="flex flex-row items-center gap-2">
                                            <Folders size={20} weight="fill" color="#71717a" />
                                            <span className="text-sm font-medium text-[#535353]">{item.name}</span>
                                        </div>
                                    );
                                })
                            }
                        </DefaultTransition> :
                        <CategoriesList categories={categories} onReload={loadRegisters} />
            }
        </BackgroundAreaDefault>
    );
}