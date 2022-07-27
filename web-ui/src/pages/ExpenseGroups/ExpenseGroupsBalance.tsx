import { Receipt, Wallet } from "phosphor-react";
import { useMemo, useState, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { ExpenseGroupsApi } from "../../apis/ExpenseGroupsApi";
import DefaultTransition from "../../components/General/DefaultTransition";
import Spinner from "../../components/General/Spinner";
import { ExpenseGroupBalanceModel } from "../../models/ExpenseGroupModel";
import ExpenseGroupBalanceItem from "./ExpenseGroupBalanceItem";

type ExpenseGroupsBalanceProps = {
    setExpenseGroupId: any;
    month: number;
}

export default function ExpenseGroupsBalance(props: ExpenseGroupsBalanceProps) {
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const [loading, setLoading] = useState(false);
    const [expenseGroups, setExpenseGroups] = useState<ExpenseGroupBalanceModel[]>();
    const [windowSize, setWindowSize] = useState(getWindowSize());

    function getWindowSize() {
        const { innerWidth } = window;
        return { innerWidth };
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        _api
            .balance(props.month)
            .then((r) => setExpenseGroups(r.data))
            .catch((e) => console.log("Erro ao carregar o balanço dos grupos de despesa", e))
            .finally(() => setLoading(false));
    }, [_api, props.month]);

    function sumBalance() {
        let sum: number = 0;
        expenseGroups?.map((item) => {
            sum = sum + item.totalValue
        })
        return (
            <div className="flex justify-center items-center gap-1 text-zinc-500">
                <Receipt size={18} weight="bold" />
                <span className="text-sm">Total: <strong>R${sum.toFixed(2)}</strong></span>
            </div>
        )
    }

    const Balance = () => {
        return (
            <div className="flex flex-col gap-4">
                {
                    loading ? <Spinner /> :
                        expenseGroups?.length === 0 ?
                            <div className="flex flex-col items-center">
                                <Wallet size={25} weight="fill" color="#71717a" />
                                <span className="font-medium text-[#71717a] text-sm mt-2">Sem grupos cadastrados</span>
                            </div> :
                            <>
                                {
                                    expenseGroups?.map((item, idx) => {
                                        return (
                                            <ExpenseGroupBalanceItem key={idx} group={item} setExpenseGroupId={props.setExpenseGroupId} />
                                        );
                                    })
                                }
                            </>
                }
            </div>
        )
    }

    return (
        <DefaultTransition>
            {
                windowSize.innerWidth > 1280 ?
                    <Scrollbars style={{ height: 560 }}>{Balance()}</Scrollbars> :
                    Balance()
            }            
            <div className="mt-3">
                {sumBalance()}
            </div>
        </DefaultTransition>
    )
}