import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Input } from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import { Check, X } from "phosphor-react";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import { InputColor } from "../../components/Form/InputColor/InputColor";
import { CreateUpdateExpenseGroupModel, ExpenseGroupModel } from "../../models/ExpenseGroupModel";
import { ExpenseGroupsApi } from "../../apis/ExpenseGroupsApi";
import { Select } from "../../components/Form/Select";
import { CategoriesApi } from "../../apis/CategoriesApi";
import { CategoryModel } from "../../models/CategoryModel";
import Spinner from "../../components/General/Spinner";
import DefaultTransition from "../../components/General/DefaultTransition";
import { RadioButton } from "../../components/Form/RadioButton";

type Props = {
    obj?: ExpenseGroupModel;
    onFinish: () => void;
}

type SelectProps = {
    label: string;
    value: string;
};

export default function ExpenseGroupForm(props: Props) {
    const [sending, setSending] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState<SelectProps[]>();
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const _apiCategory = useMemo(() => new CategoriesApi(), []);

    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
    }).required();

    const form = useForm<CreateUpdateExpenseGroupModel>({
        resolver: yupResolver(schema)
    });

    const type = form.watch("type");

    useEffect(() => {
        if (props.obj) {
            form.setValue("type", props.obj?.type);
            form.setValue("categoryId", props.obj?.category.id);
        }
        else {
            form.setValue("type", 0);
        }
    }, [])

    useEffect(() => {
        setIsLoadingCategories(true);
        _apiCategory.find()
            .then((r) => {
                const option = r.data.map((item: CategoryModel) => {
                    return {
                        label: item.name,
                        value: item.id,
                    };
                });
                setCategoryOptions(option);

                if (r.data.length > 0) form.setValue("categoryId", r.data[0].id);
            })
            .catch((e) => toast.info("Sem categorias disponíveis"))
            .finally(() => setIsLoadingCategories(false));
    }, [_apiCategory]);

    const onSubmit = (data: any) => {
        const processedData = {
            name: String(data.name),
            color: String(data.color),
            type: Number(form.watch("type")),
            paymentDay: data.paymentDay !== "" ? Number(data.paymentDay) : undefined,
            categoryId: String(data.categoryId)
        }

        setSending(true);
        if (data.id && data.id != undefined) {
            _api.update(data.id, processedData)
                .then(r => {
                    toast.success("Cadastro atualizado com sucesso");
                    props.onFinish();
                })
                .catch((e) => {
                    toast.error(e.message);
                    console.log("Erro ao atualizar cadastro", e);
                })
                .finally(() => setSending(false));
        }
        else {
            _api.create(processedData)
                .then(r => {
                    toast.success("Cadastro criado com sucesso");
                    props.onFinish();
                })
                .catch((e) => {
                    toast.error(e.message);
                    console.log("Erro ao criar cadastro", e);
                })
                .finally(() => setSending(false));
        }
    }

    return (
        <DefaultTransition>
            <div className="mb-4">
                {
                    props.obj ?
                        <>
                            <h3 className="text-2xl font-bold mb-2">
                                Edição de grupo de despesas
                            </h3>
                            <p className="text-xs text-zinc-400">Altere apenas as informações que desejar</p>
                        </> :
                        <>
                            <h3 className="text-2xl font-bold mb-2">
                                Crie um novo grupo de despesas!
                            </h3>
                            <p className="text-xs text-zinc-400">Preencha as informações para criar um novo registro.</p>
                        </>
                }
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <input type="hidden" {...form.register("id")} value={props.obj?.id} />
                <div className="flex flex-wrap -mx-2">
                    <Input
                        type="text"
                        name={"name"}
                        form={form}
                        label={"Nome"}
                        className="w-full sm:w-1/1 md:w-4/5 lg:w-4/5 xl:w-4/5"
                        defaultValue={props.obj?.name}
                    />
                    <InputColor
                        name={"color"}
                        form={form}
                        label={"Cor"}
                        className="w-full sm:w-1/1 md:w-1/5 lg:w-1/5 xl:w-1/5"
                        defaultValue={props.obj?.color}
                    />
                </div>
                <div className="flex flex-wrap -mx-2">
                    {
                        isLoadingCategories ?
                            <div className="w-full flex justify-center items-center">
                                <Spinner />
                            </div> :
                            <Select
                                name="categoryId"
                                form={form}
                                options={categoryOptions}
                                className="w-full"
                                label={"Categoria"}
                                defaultValue={props.obj?.category.id}
                            />
                    }
                </div>
                <div className="flex flex-wrap">
                    {/* <Select
                        name="type"
                        form={form}
                        options={typeOptions}
                        className="w-full sm:w-1/1 md:w-1/5 lg:w-1/5 xl:w-1/5"
                        label={"Tipo"}
                        defaultValue={props.obj?.type}
                    /> */}
                    <div className="flex flex-col w-full sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/2">
                        <span className="text-gray-700 text-sm font-bold mb-2">Tipo de pagamento</span>
                        <RadioButton
                            form={form}
                            name="type"
                            id="individualPaymentType"
                            label={"Pagamento individual"}
                            value={0}
                            defaultChecked={props.obj?.type === 0}
                        />
                        <RadioButton
                            form={form}
                            name="type"
                            id="totalPaymentType"
                            label={"Pagamento total"}
                            value={1}
                            defaultChecked={props.obj?.type === 1}
                        />
                    </div>
                    {
                        type === 1 ?
                            <Input
                                type="number"
                                name={"paymentDay"}
                                form={form}
                                label={"Dia de pagamento"}
                                className="w-full sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/2"
                                defaultValue={props.obj?.paymentDay}
                            /> :
                            <></>
                    }
                </div>

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