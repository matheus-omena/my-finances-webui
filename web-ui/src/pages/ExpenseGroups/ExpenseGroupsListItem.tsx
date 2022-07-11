import { ArrowSquareOut, CalendarBlank, Circle, FolderSimple, Trash } from "phosphor-react";
import { ExpenseGroupModel } from "../../models/ExpenseGroupModel";

type ExpenseGroupsListItemProps = {
    item: ExpenseGroupModel;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function ExpenseGroupsListItem(props: ExpenseGroupsListItemProps) {
    const { item, onEdit, onDelete } = props;

    return (
        <div className="bg-[#181818] p-3 rounded-2xl w-full">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <div className="group flex items-center gap-1 text-sm mb-1 cursor-pointer hover:font-bold" onClick={() => onEdit(item.id)}>
                        {item.name}
                        <Circle color={item.color} size={15} weight="fill" />
                        <ArrowSquareOut size={15} weight="bold" className="hidden group-hover:block group-hover:transition" />
                    </div>
                    {
                        item.type === 1 ?
                            <div className="flex items-center gap-1 text-zinc-500 mb-1">
                                <CalendarBlank size={12} />
                                <small className="text-xs">Dia de pagamento: <strong>{item?.paymentDay}</strong></small>
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
    )
}