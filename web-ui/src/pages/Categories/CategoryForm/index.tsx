import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CategoryModel } from "../../../models/CategoryModel";
import { CategoriesApi } from "../../../apis/CategoryApi";
import { Input } from "../../../components/Form/Input";
import Button from "../../../components/Form/Button";
import { Check, X } from "phosphor-react";
import BackgroundAreaDefault from "../../../components/General/BackgroundAreaDefault";

type Props = {
    obj?: CategoryModel;
}

export default function CategoryForm(props: Props) {    
    const navigate = useNavigate();
    const [sending, setSending] = useState(false);
    const _api = useMemo(() => new CategoriesApi(), []);

    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
    }).required();

    const form = useForm<CategoryModel>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        setSending(true);
        if (data.id && data.id != undefined) {
            _api.update(data.id, data)
                .then(r => {
                    toast.success("Cadastro atualizado com sucesso");
                    navigate("/categories");
                })
                .catch((e) => {
                    toast.error(e.message);
                    console.log("Erro ao atualizar cadastro", e);
                })
                .finally(() => setSending(false));
        }
        else {
            _api.create(data)
                .then(r => {
                    toast.success("Cadastro criado com sucesso");
                    navigate("/categories");
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
                    {props.obj ? "" : <span>Nova </span>}
                    Categoria
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
                            className="w-full sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1"
                            defaultValue={props.obj?.name}
                        />
                    </div>

                    <hr className="text-grey my-3" />

                    <div className="flex justify-end gap-6">
                        <button className="flex items-center justify-center text-sm" onClick={() => navigate("/categories")}>
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