import { Modal } from "flowbite-react";
import moment from "moment";
import { ArrowSquareOut, CalendarBlank, Plus, Trash } from "phosphor-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
import { CategoriesApi } from "../../apis/CategoriesApi";
import GoBackButton from "../../components/Form/GoBackButton";
import DefaultTransition from "../../components/General/DefaultTransition";
import { CategoryModel } from "../../models/CategoryModel";
import { OperationType } from "../../models/RegistersEnums";
import EditCategory from "./EditCategory";
import NewCategory from "./NewCategory";

type CategoriesListProps = {
    categories?: CategoryModel[];
    onReload: () => void;
}

export default function CategoriesList(props: CategoriesListProps) {
    const { categories, onReload } = props;
    const _api = useMemo(() => new CategoriesApi(), []);
    const [showModalForm, setShowModalForm] = useState(false);
    const [operationType, setOperationType] = useState<OperationType>(OperationType.CREATE);
    const [actualCategoryId, setActualCategoryId] = useState("");

    const handleCreate = () => {
        setOperationType(OperationType.CREATE);
        setActualCategoryId("");
        setShowModalForm(true);
    }

    const handleEdit = (id: string) => {
        setOperationType(OperationType.EDIT);
        setActualCategoryId(id);
        setShowModalForm(true);
    }

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

                        onReload();
                    })
                    .catch((e) => console.log("Erro ao excluir registro", e))
                    .finally();
            }
        })
    }

    return (

        <DefaultTransition className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex justify-between mb-4">
                <GoBackButton onClick={onReload} />
                <button
                    type="button"
                    onClick={handleCreate}
                    className="flex text-xs gap-2"
                >
                    Adicionar categoria
                    <Plus size={15} weight="bold" />
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {
                    categories?.length === 0 ?
                        <span>Sem categorias cadastradas</span> :

                        categories?.map((item) => {
                            return (
                                <div key={item.id} className="bg-[#181818] p-3 rounded-2xl w-full">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <div className="group flex items-center gap-1 text-sm mb-1 cursor-pointer hover:font-bold" onClick={() => handleEdit(item.id)}>
                                                {item.name}
                                                <ArrowSquareOut size={15} weight="bold" className="hidden group-hover:block group-hover:transition" />
                                            </div>
                                            <div className="flex items-center gap-1 text-zinc-500">
                                                <CalendarBlank size={12} />
                                                <small className="text-xs">{moment(item.createdAt).format("DD/MM/YYYY")}</small>
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
                                <NewCategory
                                    onFinish={() => {
                                        setShowModalForm(false);
                                        onReload();
                                    }}
                                /> :
                                <EditCategory
                                    id={actualCategoryId}
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
    );
}