import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CreateUpdateExpenseModel, ExpenseModel } from "../../../models/ExpenseModel";
import DefaultTransition from "../../../components/General/DefaultTransition";
import { Check, Info, X } from "phosphor-react";
import Button from "../../../components/Form/Button";
import { ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import { Input } from "../../../components/Form/Input";
import { ExpensesApi } from "../../../apis/ExpensesApi";
import { ResponsiblesApi } from "../../../apis/ResponsiblesApi";
import { toast } from "react-toastify";
import { ResponsibleModel } from "../../../models/ResponsibleModel";
import { Select } from "../../../components/Form/Select";
import Spinner from "../../../components/General/Spinner";
import { RadioButton } from "../../../components/Form/RadioButton";

type ExpenseFormProps = {
    expenseGroup: ExpenseGroupModel;
    obj?: ExpenseModel;
    onFinish: () => void;
}

type SelectProps = {
    label: string;
    value: string;
};

export default function ExpenseForm(props: ExpenseFormProps) {
    console.log("PROPS", props);
    const [sending, setSending] = useState(false);
    const _api = useMemo(() => new ExpensesApi(), []);
    const _apiResponsible = useMemo(() => new ResponsiblesApi(), []);
    const [loadingResponsibles, setLoadingResponsibles] = useState(false);
    const [responsibleOptions, setResponsibleOptions] = useState<SelectProps[]>();

    const [isFixed, setIsFixed] = useState(false);
    const [isItInstallments, setIsItInstallments] = useState(false);
    //const [showPaymentDayInput, setShowPaymentDayInput] = useState(props.obj?.type === 1 || false);

    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
        value: yup.string().required("O valor é obrigatório"),
    }).required();

    const form = useForm<any>({
        resolver: yupResolver(schema)
    });

    if (props.obj)
        form.setValue("responsibleId", props.obj?.responsible.id);

    const fixed = form.watch("isFixed");
    const isInstallments = form.watch("isItInstallments");

    useEffect(() => {
        setIsFixed(String(fixed) === "true");
    }, [fixed])

    useEffect(() => {
        setIsItInstallments(String(isInstallments) === "true");
    }, [isInstallments])

    useEffect(() => {
        if (props.obj)
            setIsFixed(props.obj?.fixedExpenseId !== "" && props.obj?.fixedExpenseId !== undefined);
    }, [])

    useEffect(() => {
        setLoadingResponsibles(true);
        _apiResponsible.find()
            .then((r) => {
                const option = r.data.map((item: ResponsibleModel) => {
                    return {
                        label: item.name,
                        value: item.id,
                    };
                });
                setResponsibleOptions(option);

                if (r.data.length > 0) form.setValue("responsibleId", r.data[0].id);
            })
            .catch((e) => toast.info("Sem responsáveis disponíveis"))
            .finally(() => setLoadingResponsibles(false));
    }, [_apiResponsible]);

    const onSubmit = (data: any) => {
        console.log("DATA", data);
        setSending(false);
        alert("TESTE")
    }

    return (
        <DefaultTransition>
            <div className="mb-4">
                {
                    props.obj ?
                        <>
                            <h3 className="text-2xl font-bold mb-2">
                                Edição de despesa
                            </h3>
                            <p className="text-xs text-zinc-400">Altere apenas as informações que desejar</p>
                        </> :
                        <>
                            <h3 className="text-2xl font-bold mb-2">
                                Crie uma nova despesa!
                            </h3>
                            <p className="text-xs text-zinc-400">Preencha as informações para criar um novo registro.</p>
                        </>
                }
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <input type="hidden" {...form.register("id")} value={props.obj?.id} />
                <input type="hidden" {...form.register("groupId")} value={props.expenseGroup?.id} />

                <h6 className={"text-gray-700 text-xs text-right font-bold mb-3"}>
                    Grupo: <span style={{ color: props.expenseGroup?.color }}>{props.expenseGroup?.name}</span>
                </h6>

                <div className="flex flex-wrap -mx-2">
                    <Input
                        type="text"
                        name={"name"}
                        form={form}
                        label={"Nome"}
                        className="w-full"
                        defaultValue={props.obj?.name}
                    />
                </div>
                <div className="flex flex-wrap items-end -mx-2">
                    <Input
                        type="number"
                        name={"value"}
                        form={form}
                        label={"Valor (R$)"}
                        className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                        defaultValue={props.obj?.value}
                    />
                    {
                        loadingResponsibles ?
                            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center">
                                <Spinner />
                            </div> :
                            <Select
                                name="responsibleId"
                                form={form}
                                options={responsibleOptions}
                                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                                label={"Responsável"}
                                defaultValue={props.obj?.responsible.id}
                            />
                    }
                </div>

                <div className="flex flex-wrap -mx-2">
                    <div className="pl-2 flex flex-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-2">
                        <div className="flex items-center text-gray-700 mb-2">
                            <span className="text-sm font-bold">É fixa?</span>
                            <button type="button" className="ml-1 hover:text-sky-400 transition-colors">
                                <Info size={18} />
                            </button>
                        </div>
                        <div className="flex gap-10">
                            <RadioButton
                                form={form}
                                name="isFixed"
                                id="isFixed-1"
                                label={"Sim"}
                                value={"true"}
                                defaultChecked={isFixed}
                            />
                            <RadioButton
                                form={form}
                                name="isFixed"
                                id="isFixed-2"
                                label={"Não"}
                                value={"false"}
                                defaultChecked={!isFixed}
                            />
                        </div>
                    </div>
                    {
                        props.expenseGroup?.type === 0 ?
                            <Input
                                type="number"
                                name="paymentDay"
                                form={form}
                                label={"Dia de pagamento"}
                                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                                defaultValue={props.obj?.paymentDay}
                            /> :
                            <Input
                                type="number"
                                name="paymentDay"
                                form={form}
                                label={"Dia de pagamento"}
                                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                                defaultValue={Number(props.expenseGroup?.paymentDay!)}
                                readonly
                            />
                    }
                </div>
                {
                    isFixed &&
                    <div className="flex flex-wrap -mx-2">
                        <div className="pl-2 flex flex-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-2">
                            <div className="flex items-center text-gray-700 mb-2">
                                <span className="text-sm font-bold">É parcelada?</span>
                            </div>
                            <div className="flex gap-10">
                                <RadioButton
                                    form={form}
                                    name="isItInstallments"
                                    id="isItInstallments-1"
                                    label={"Sim"}
                                    value={"true"}
                                    defaultChecked={isItInstallments}
                                />
                                <RadioButton
                                    form={form}
                                    name="isItInstallments"
                                    id="isItInstallments-2"
                                    label={"Não"}
                                    value={"false"}
                                    defaultChecked={!isItInstallments}
                                />
                            </div>
                        </div>

                        {
                            isItInstallments &&
                            <Input
                                type="number"
                                name="totalInstallments"
                                form={form}
                                label={"Qtd. Parcelas"}
                                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                                defaultValue={props.obj?.totalInstallments}
                                readonly={props.obj !== undefined}
                            />
                        }
                    </div>
                }

                <div className="flex justify-end gap-6">
                    <button className="flex items-center justify-center text-sm" onClick={props.onFinish}>
                        <X className="mr-1" weight="bold" />
                        <strong>Cancelar</strong>
                    </button>
                    <Button
                        type="submit"
                        title={<><Check className="mr-1" weight="bold" /><span>Salvar</span></>}
                        loading={sending}
                    />
                </div>
            </form>
        </DefaultTransition>
    );
}