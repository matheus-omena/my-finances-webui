import { DotsThreeVertical, Folders } from "phosphor-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CategoriesApi } from "../../apis/CategoriesApi";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import Spinner from "../../components/General/Spinner";
import { CategoryModel } from "../../models/CategoryModel";

export function CategoriesPreview() {
    const _api = useMemo(() => new CategoriesApi(), []);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>();

    useEffect(() => {
        setLoading(true);
        _api
            .find()
            .then((r) => setCategories(r.data))
            .catch((e) => console.log("Erro ao carregar as categorias", e))
            .finally(() => setLoading(false));
    }, [_api]);

    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Cadastros</span>
                    <span className="font-medium text-white">Categorias</span>
                </div>

                <Link to="/categories">
                    <DotsThreeVertical color="#535353" weight="bold" size={30} />
                </Link>
            </div>
            {/* Header */}
            {
                loading ? <Spinner /> :
                    <div className="grid grid-cols-2 gap-3">
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
                    </div>
            }
        </BackgroundAreaDefault>
    );
}