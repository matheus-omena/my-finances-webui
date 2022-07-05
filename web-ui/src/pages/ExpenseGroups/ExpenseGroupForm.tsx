import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

type Props = {
    obj?: ExpenseGroupModel;
}

type SelectProps = {
    label: string;
    value: string;
};

const typeOptions = [
    { label: "Pagamento individual", value: 0 },
    { label: "Pagamento total", value: 1 },
]

export default function ExpenseGroupForm(props: Props) {
    const navigate = useNavigate();

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
    
    useEffect(() => {
        if (props.obj) {
            form.setValue("type", props.obj?.type);
            form.setValue("categoryId", props.obj?.category.id);
        }
        else {
            form.setValue("type", typeOptions[0].value);
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

        console.log("ProcessedData", processedData);

        setSending(true);
        if (data.id && data.id != undefined) {
            _api.update(data.id, processedData)
                .then(r => {
                    toast.success("Cadastro atualizado com sucesso");
                    navigate("/expense-groups");
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
                    navigate("/expense-groups");
                })
                .catch((e) => {
                    toast.error(e.message);
                    console.log("Erro ao criar cadastro", e);
                })
                .finally(() => setSending(false));
        }
    }    

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h4 className="fw-bold text-dark-green">
                    {props.obj ? "" : <span>Novo </span>}
                    Grupo de despesas
                </h4>
            </div>

            <BackgroundAreaDefault>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <input type="hidden" {...form.register("id")} value={props.obj?.id} />
                    <div className="flex flex-wrap -mx-2">
                        <Input
                            type="text"
                            name={"name"}
                            form={form}
                            label={"Nome"}
                            className="w-full sm:w-1/1 md:w-1/5 lg:w-1/5 xl:w-1/5"
                            defaultValue={props.obj?.name}
                        />
                        <InputColor
                            name={"color"}
                            form={form}
                            label={"Cor"}
                            className="w-full sm:w-1/1 md:w-1/5 lg:w-1/5 xl:w-1/5"
                            defaultValue={props.obj?.color}
                        />
                        <Select
                            name="type"
                            form={form}
                            options={typeOptions}
                            className="w-full sm:w-1/1 md:w-1/5 lg:w-1/5 xl:w-1/5"
                            label={"Tipo"}
                            defaultValue={props.obj?.type}
                        />
                        <Input
                            type="number"
                            name={"paymentDay"}
                            form={form}
                            label={"Dia de pagamento"}
                            className="w-full sm:w-1/1 md:w-1/5 lg:w-1/5 xl:w-1/5"
                            defaultValue={props.obj?.paymentDay}
                        />
                        {
                            isLoadingCategories ?
                                <div className="w-full sm:w-1/1 md:w-1/5 lg:w-1/5 xl:w-1/5 flex justify-center items-center">
                                    <Spinner />
                                </div> :
                                <Select
                                    name="categoryId"
                                    form={form}
                                    options={categoryOptions}
                                    className="w-full sm:w-1/1 md:w-1/5 lg:w-1/5 xl:w-1/5"
                                    label={"Categoria"}
                                    defaultValue={props.obj?.category.id}
                                />
                        }
                    </div>

                    <hr className="text-grey my-3" />

                    <div className="flex justify-end gap-6">
                        <button className="flex items-center justify-center text-sm" onClick={() => navigate("/expense-groups")}>
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
            </BackgroundAreaDefault>
        </>
    );
}