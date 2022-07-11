import { DotsThreeVertical, UserCircle } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ResponsiblesApi } from "../../apis/ResponsiblesApi";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import DefaultTransition from "../../components/General/DefaultTransition";
import Spinner from "../../components/General/Spinner";
import { ViewMode } from "../../models/RegistersEnums";
import { ResponsibleModel } from "../../models/ResponsibleModel";
import ResponsiblesList from "./ResponsiblesList";

export function ResponsiblesPreview() {
    const _api = useMemo(() => new ResponsiblesApi(), []);
    const [loading, setLoading] = useState(false);
    const [responsibles, setResponsibles] = useState<ResponsibleModel[]>();
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.PREVIEW);

    const loadRegisters = useCallback(() => {
        setViewMode(ViewMode.PREVIEW);
        setLoading(true);
        _api
            .find()
            .then((r) => {
                setResponsibles(r.data);
            })
            .catch((e) => console.log("Erro ao carregar os responsáveis"))
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
                    <span className="font-medium text-white">Responsáveis</span>
                </div>

                <button type="button" className="text-[#535353] hover:text-white transition-colors" onClick={() => setViewMode(ViewMode.LIST)}>
                    <DotsThreeVertical weight="bold" size={30} />
                </button>
            </div>
            {/* Header */}

            {
                loading ? <Spinner /> :
                    viewMode === ViewMode.PREVIEW ?
                        <DefaultTransition className="grid grid-cols-2 gap-3">
                            {
                                responsibles?.map((item) => {
                                    return (
                                        <div key={item.id} className="flex flex-row items-center gap-2">
                                            <UserCircle size={20} weight="fill" /*color={item.color} opacity={0.5}*/ color="#71717a" />
                                            <span className="text-sm font-medium text-[#535353]">{item.name}</span>
                                        </div>
                                    );
                                })
                            }
                        </DefaultTransition> :
                        <ResponsiblesList responsibles={responsibles} onReload={loadRegisters} />
            }
        </BackgroundAreaDefault>
    );
}