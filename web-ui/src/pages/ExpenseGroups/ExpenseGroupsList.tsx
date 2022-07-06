import { Modal } from "flowbite-react";
import moment from "moment";
import { ArrowSquareOut, CalendarBlank, Circle, FolderSimple, FolderSimpleStar, Plus, Trash } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
import { ExpenseGroupsApi } from "../../apis/ExpenseGroupsApi";
import GoBackButton from "../../components/Form/GoBackButton";
import DefaultTransition from "../../components/General/DefaultTransition";
import Spinner from "../../components/General/Spinner";
import { ExpenseGroupModel } from "../../models/ExpenseGroupModel";
import { OperationType } from "../../models/RegistersEnums";
import EditExpenseGroup from "./EditExpenseGroup";
import NewExpenseGroup from "./NewExpenseGroup";

type ExpenseGroupsListProps = {
    onReload: () => void;
}

export default function ExpenseGroupsList(props: ExpenseGroupsListProps) {
    const { onReload } = props;
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const [showModalForm, setShowModalForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState<ExpenseGroupModel[]>();
    const [operationType, setOperationType] = useState<OperationType>(OperationType.CREATE);
    const [actualGroupId, setActualGroupId] = useState("");

    const handleCreate = () => {
        setOperationType(OperationType.CREATE);
        setActualGroupId("");
        setShowModalForm(true);
    }

    const handleEdit = (id: string) => {
        setOperationType(OperationType.EDIT);
        setActualGroupId(id);
        setShowModalForm(true);
    }

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
                <DefaultTransition>
                    <div className="flex justify-between mb-4">
                        <GoBackButton onClick={onReload} />
                        <button
                            type="button"
                            onClick={handleCreate}
                            className="flex text-xs gap-2"
                        >
                            Adicionar grupo
                            <Plus size={15} weight="bold" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {
                            groups?.length === 0 ?
                                <span>Sem grupos cadastrados</span> :

                                groups?.map((item) => {
                                    return (
                                        <div key={item.id} className="bg-[#181818] p-3 rounded-2xl w-full">
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <div className="group flex items-center gap-1 text-sm mb-1 cursor-pointer hover:font-bold" onClick={() => handleEdit(item.id)}>
                                                        {item.name}
                                                        <Circle color={item.color} size={15} weight="fill" />
                                                        <ArrowSquareOut size={15} weight="bold" className="hidden group-hover:block group-hover:transition" />
                                                    </div>
                                                    {
                                                        item.paymentDay ?
                                                            <div className="flex items-center gap-1 text-zinc-500 mb-1">
                                                                <CalendarBlank size={12} />
                                                                <small className="text-xs">Dia de pagamento: <strong>{item.paymentDay}</strong></small>
                                                            </div> : <></>
                                                    }
                                                    <div className="flex items-center gap-1 text-zinc-500">
                                                        <FolderSimple size={12} />
                                                        <small className="text-xs">Categoria: <strong>{item.category.name}</strong></small>
                                                    </div>
                                                </div>
                                                <button className="flex justify-end" onClick={() => onDelete(item.id)}>
                                                    <Trash weight="bold" size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                        }
                    </div>
                    <Modal
                        show={showModalForm}
                        size="md"
                        popup={true}
                        onClose={() => setShowModalForm(false)}
                        color="#0f172a"
                    >
                        <div className="bg-zinc-800 rounded-md">
                            <Modal.Header />
                            <Modal.Body>
                                {
                                    operationType === OperationType.CREATE ?
                                        <NewExpenseGroup
                                            onFinish={() => {
                                                setShowModalForm(false);
                                                onReload();
                                            }}
                                        /> :
                                        <EditExpenseGroup
                                            id={actualGroupId}
                                            onFinish={() => {
                                                setShowModalForm(false);
                                                onReload();
                                            }}
                                        />
                                }
                            </Modal.Body>
                        </div>
                    </Modal>

                </DefaultTransition>
            }
        </>
    );
}