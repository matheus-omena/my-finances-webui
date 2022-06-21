import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ResponsiblesApi } from "../../../apis/ResponsiblesApi";
import Spinner from "../../../components/General/Spinner";
import { ResponsibleModel } from "../../../models/ResponsibleModel";
import ResponsibleForm from "../ResponsibleForm";

export default function EditResponsible() {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();    
    const _api = useMemo(() => new ResponsiblesApi(), []);
    const [responsible, setResponsible] = useState<ResponsibleModel>();

    useEffect(() => {
        setLoading(true);

        if (id)
            _api.findById(id)
                .then(r => {                    
                    setResponsible(r.data.data);
                })
                .catch(() => console.log("Erro ao carregar cadastro ", id))
                .finally(() => setLoading(false));
    }, [_api, id])

    return (
        <>
            {
                loading ? <Spinner /> :
                    <ResponsibleForm obj={responsible} />

            }
        </>
    );
}