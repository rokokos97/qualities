import React, { useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import QualitiesTable from "../components/ui/qualitiesTable";
import axios from "axios";
import config from "../config.json"

const QualitiesListPage = () => {
    const [qualities, setQualities] = useState([]);
    useEffect(async () => {
        const { data } = await axios.get( config.apiEndPoint + "quality")
        setQualities(data.content)
    }, [])
    const history = useHistory();
    const handleEdit = (param) => {
        console.log(param);
        history.push(`/edit/${param}`);
    };
    const handleDelete = (param) => {
        console.log(param);
    };
    return (
        <>
            <h1>Qualitites List Page</h1>
            <QualitiesTable
                onDelete={handleDelete}
                onEdit={handleEdit}
                data={qualities}
            />
        </>
    );
};

export default QualitiesListPage;
