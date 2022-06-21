import moment from "moment";
import { Plus, Trash } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
import { ExpenseGroupsApi } from "../../apis/ExpenseGroupsApi";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import Spinner from "../../components/General/Spinner";
import { ExpenseGroupModel } from "../../models/ExpenseGroupModel";

export default function ExpenseGroups() {    
    const navigate = useNavigate();
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState<ExpenseGroupModel[]>();

    const loadRegisters = useCallback(() => {
        setLoading(true);
        _api
            .find()
            .then((r) => {
                setGroups(r.data);
            })
            .catch((e) => console.log("Erro ao carregar os grupos de despesas"))
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
                        <h1 className="text-2xl font-bold">Grupos de despesas</h1>

                        <button
                            type="submit"
                            onClick={() => navigate("/expense-groups/new")}
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
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Dia de Pagamento</th>
                                        <th scope="col">Categoria</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {groups?.map((item, idx) => {
                                        return (
                                            <tr key={idx} className="border-b border-zinc-700">
                                                <td className="cursor-pointer py-3" onClick={() => navigate(`/responsibles/${item.id}/edit`)}>
                                                    {item.name}
                                                </td>
                                                <td className="cursor-pointer py-3" onClick={() => navigate(`/responsibles/${item.id}/edit`)}>
                                                    <div className={`w-10 h-6 rounded-md`} style={{backgroundColor: `${item.color}`}}></div>
                                                </td>     
                                                <td className="cursor-pointer py-3" onClick={() => navigate(`/responsibles/${item.id}/edit`)}>
                                                    {item.type === 0 ? "Pagamento individual" : item.type === 1 && "Pagamento total"}
                                                </td>    
                                                <td className="cursor-pointer py-3" onClick={() => navigate(`/responsibles/${item.id}/edit`)}>
                                                    {item.paymentDay ? item.paymentDay : "-"}
                                                </td> 
                                                <td className="cursor-pointer py-3" onClick={() => navigate(`/responsibles/${item.id}/edit`)}>
                                                    {item.category.name}
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