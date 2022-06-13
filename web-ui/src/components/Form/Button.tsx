import { CircleNotch } from "phosphor-react";

type ButtonProps = {
    title: string | React.ReactNode;
    type?: "button" | "submit";
    onClick?: any;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    outline?: boolean;
}

export default function Button(props: ButtonProps) {
    const defaultType = props.type ? props.type : "button";

    return (
        <button
            type={defaultType}
            className={`bg-emerald-600 flex justify-center items-center p-2 rounded-md gap-1`}
            onClick={props.onClick}
            disabled={props.loading || props.disabled}
        >
            {props.loading ? (
                <CircleNotch className="animate-spin" size={10} weight="bold" />
            ) : (
                props.title
            )}
        </button>
    )
}