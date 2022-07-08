import { ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import ExpenseForm from "./ExpenseForm";

type NewExpenseByGroupProps = {
    expenseGroup: ExpenseGroupModel;
    onFinish: () => void;
}

export default function NewExpenseByGroup(props: NewExpenseByGroupProps) {
    const { expenseGroup, onFinish } = props;

    return (
        <ExpenseForm expenseGroup={expenseGroup} onFinish={onFinish} />
    );
}