import { DotsThreeVertical, UserCircle } from "phosphor-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ResponsiblesApi } from "../../apis/ResponsiblesApi";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import Spinner from "../../components/General/Spinner";
import { ResponsibleModel } from "../../models/ResponsibleModel";

export function ResponsiblesPreview() {
    const _api = useMemo(() => new ResponsiblesApi(), []);
    const [loading, setLoading] = useState(false);
    const [responsibles, setResponsibles] = useState<ResponsibleModel[]>();

    useEffect(() => {
        setLoading(true);
        _api
            .find()
            .then((r) => setResponsibles(r.data))
            .catch((e) => console.log("Erro ao carregar os responsáveis", e))
            .finally(() => setLoading(false));
    }, [_api]);

    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Cadastros</span>
                    <span className="font-medium text-white">Responsáveis</span>
                </div>

                <Link to="/responsibles">
                    <DotsThreeVertical color="#535353" weight="bold" size={30} />
                </Link>
            </div>
            {/* Header */}
            {
                loading ? <Spinner /> :
                    <div className="grid grid-cols-2 gap-3">
                        {
                            responsibles?.map((item, idx) => {
                                return (
                                    <div key={idx} className="flex flex-row items-center gap-2">
                                        <UserCircle size={20} weight="fill" color={item.color} opacity={0.5}/>
                                        <span className="text-sm font-medium text-[#535353]">{item.name}</span>
                                    </div>
                                );
                            })
                        }
                    </div>
            }
        </BackgroundAreaDefault>
    );
}