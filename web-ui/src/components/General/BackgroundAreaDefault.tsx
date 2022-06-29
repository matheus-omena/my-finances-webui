type BackgroundAreaDefaultProps = {
    children: any;
    className?: string;
}

export default function BackgroundAreaDefault(props: any) {
    return (
        <div className={`bg-[rgb(31,31,31)] p-5 rounded-2xl ${props.className}`}>
            {props.children}
        </div>
    )
}