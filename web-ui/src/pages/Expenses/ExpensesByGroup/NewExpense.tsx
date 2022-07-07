import { useParams } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";

export default function NewExpenseByGroup() {
    const { groupId } = useParams();

    return (
        <ExpenseForm groupId={groupId!} />
    );
}