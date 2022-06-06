import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { DefaultInput } from "../../components/Form/DefaultInput";
import { useAuth } from "../../contexts/AuthContext";
import { LoginModel } from "../../models/Auth/LoginModel";

export default function SignIn() {
    const schema = yup.object({
        email: yup.string().required("O e-mail é obrigatório"),
        password: yup.string().required("A senha é obrigatória"),
    }).required();

    const form = useForm<LoginModel>({
        resolver: yupResolver(schema)
    });
    const auth = useAuth();

    const onSubmit = (data: LoginModel) => {
        auth.Login(data);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-[rgb(31,31,31)] p-5 rounded-2xl w-full max-w-xs">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DefaultInput type="email" name="email" form={form} label="E-mail" />
                    <DefaultInput type="password" name="password" form={form} label="Senha" />

                    <button type="submit" className="bg-emerald-600 w-full p-2 rounded-md mt-4 font-bold">Entrar</button>
                </form>
            </div>
        </div>
    );
}