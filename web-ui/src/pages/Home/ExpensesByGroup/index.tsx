import { DotsThreeVertical } from "phosphor-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExpenseGroupsApi } from "../../../apis/ExpenseGroupsApi";
import BackgroundAreaDefault from "../../../components/General/BackgroundAreaDefault";
import Spinner from "../../../components/General/Spinner";
import { ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import ExpenseGroup from "./ExpenseGroup";

export function ExpensesByGroup() {
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const [loading, setLoading] = useState(false);
    const [expenseGroups, setExpenseGroups] = useState<ExpenseGroupModel[]>();

    useEffect(() => {
        setLoading(true);
        _api
            .find()
            .then((r) => setExpenseGroups(r.data))
            .catch((e) => console.log("Erro ao carregar os grupos de despesa", e))
            .finally(() => setLoading(false));
    }, [_api]);

    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Balanço</span>
                    <span className="font-medium text-white">Grupos de despesas</span>
                </div>

                <Link to="/expense-groups">
                    <DotsThreeVertical color="#535353" weight="bold" size={30} />
                </Link>
            </div>
            {/* Header */}
            <div className="flex flex-col gap-4">
                {/* {
                    loading ? <Spinner /> :
                        <div className="grid grid-cols-2 gap-3">
                            {
                                expenseGroups?.map((item, idx) => {
                                    return (
                                        <div key={idx} className="flex flex-row items-center gap-2">
                                            <Folders size={20} weight="fill" color="#71717a" />
                                            <span className="text-sm font-medium text-[#535353]">{item.name}</span>
                                        </div>
                                    );
                                })
                            }
                        </div>
                } */}
                <ExpenseGroup id={""} name={"Despesas gerais"} value={2050} color={"#059669"} paymentPercentage={40} />
                <ExpenseGroup id={""} name={"Contas da empresa"} value={1540} color={"#1f2937"} paymentPercentage={75} />
                <ExpenseGroup id={""} name={"Renner"} value={600} color={"#f43f5e"} paymentPercentage={0} />
                <ExpenseGroup id={""} name={"Cartão Porto"} value={1700} color={"#0284c7"} paymentPercentage={100} />
                <ExpenseGroup id={""} name={"Cartão Itaú"} value={799} color={"#ea580c"} paymentPercentage={0} />
                <ExpenseGroup id={""} name={"Cartão NuBank"} value={350} color={"#9333ea"} paymentPercentage={0} />
                <ExpenseGroup id={""} name={"Cartão C6"} value={3600} color={"#18181b"} paymentPercentage={100} />
            </div>
        </BackgroundAreaDefault>
    );
}