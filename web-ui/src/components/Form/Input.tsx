import { UseFormReturn, FieldValues } from "react-hook-form";

type InputProps = {
    form: UseFormReturn<FieldValues | any>;
    name: string;
    label?: any;
    placeholder?: string;
    type?: "text" | "password" | "email" | "number" | "date";
    className?: string;
    defaultValue?: string | number;
    readonly?: boolean;
    onChange?: any;
};

export function Input(props: InputProps) {
    const defaultType = props.type ? props.type : "text";

    return (
        <div className={`${props.className} px-2 mb-5`}>
            <label htmlFor={props.name} className="block text-gray-700 text-sm font-bold mb-2">
                {props.label}
            </label>
            <input
                {...props.form.register(props.name)}
                className={`bg-transparent rounded-md w-full p-3 text-white text-sm leading-tight border focus:ring-0
                    ${props.form.formState.errors[props.name] ? "border-red-500 focus:border-red-500" : "border-gray-700 focus:border-gray-700"}`}
                type={defaultType}
                id={props.name}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue ?? ""}
                readOnly={props.readonly}
                onChange={props.onChange}
            />
            {props.form.formState.errors[props.name] && (
                <small className="text-red-500 text-xs">
                    <>
                        *{props.form.formState.errors[props.name]?.message || "Valor inválido"}
                    </>
                </small>
            )}
        </div>
    );
}