import { ArrowCircleLeft } from "phosphor-react";

type GoBackButtonProps = {
    onClick: () => void;
}

export default function GoBackButton(props: GoBackButtonProps) {
    const { onClick } = props;

    return (
        <button className="flex items-center text-xs text-red-400 gap-2" onClick={onClick}>
            <ArrowCircleLeft size={20} weight="fill" />
            Voltar
        </button>
    );
}