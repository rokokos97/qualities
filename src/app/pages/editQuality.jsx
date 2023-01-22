import React, { useEffect, useState } from "react";
import EditForm from "../components/ui/editForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditQualityPage = () => {
    const [quality, setQuality] = useState(null);
    const id = useParams().id
    useEffect(async () => {
        const { data } = await axios.get(`http://localhost:4000/api/v1/quality/${id}`)
        setQuality(data.content)
    },);
    return (
        <>
            <h1>Edit Quality Page</h1> <EditForm data={quality}/>
        </>
    );
};

export default EditQualityPage;
