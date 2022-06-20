import moment from "moment";
import { Plus, Trash } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
import { ResponsiblesApi } from "../../apis/ResponsiblesApi";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import Spinner from "../../components/General/Spinner";
import { ResponsibleModel } from "../../models/ResponsibleModel";

export default function Responsibles() {    
    const navigate = useNavigate();
    const _api = useMemo(() => new ResponsiblesApi(), []);
    const [loading, setLoading] = useState(false);
    const [responsibles, setResponsibles] = useState<ResponsibleModel[]>();

    const loadRegisters = useCallback(() => {
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

    const onDelete = (id: string) => {
        Swal.fire({
            title: "Deseja excluir esse registro?",
            text: "Essa ação não poderá ser revertida.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                _api
                    .delete(id)
                    .then((r) => {
                        toast.success("Registro excluído com sucesso");

                        loadRegisters();
                    })
                    .catch((e) => console.log("Erro ao excluir registro", e))
                    .finally(() => setLoading(false));
            }
        })
    }

    return (
        <>
            {loading ?
                <Spinner /> :
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Responsáveis</h1>

                        <button
                            type="submit"
                            onClick={() => navigate("/responsibles/new")}
                        >
                            <Plus size={25} weight="bold" />
                        </button>
                    </div>
                    <BackgroundAreaDefault>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-white">
                                <thead className="text-sm text-gray-500">
                                    <tr>                                        
                                        <th scope="col">Nome</th>
                                        <th scope="col">Cor</th>
                                        <th scope="col">Criado em</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {responsibles?.map((item, idx) => {
                                        return (
                                            <tr key={idx} className="border-b border-zinc-700">
                                                <td className="cursor-pointer py-3" onClick={() => navigate(`/responsibles/${item.id}/edit`)}>
                                                    {item.name}
                                                </td>
                                                <td className="cursor-pointer py-3" onClick={() => navigate(`/responsibles/${item.id}/edit`)}>
                                                    <div className={`w-10 h-6 rounded-md`} style={{backgroundColor: `${item.color}`}}></div>
                                                </td>
                                                <td className="cursor-pointer py-3" onClick={() => navigate(`/responsibles/${item.id}/edit`)}>
                                                    {moment(item.createdAt).format('ll')}
                                                </td>
                                                <td className="py-3">
                                                    <button className="w-full flex justify-end" onClick={() => onDelete(item.id.toString())}>
                                                        <Trash weight="bold" size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </BackgroundAreaDefault>
                </>
            }
        </>
    );
}