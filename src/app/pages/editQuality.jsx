import React, { useEffect, useState } from "react";
import EditForm from "../components/ui/editForm";
import { useParams } from "react-router-dom";
import httpService from "../services/httpService";
import config from "../config.json"
const EditQualityPage = () => {
    const [quality, setQuality] = useState(null);
    const id = useParams().id
    const qualityEndPoint = config.apiEndPoint + `quality/${id}`


    const updateQuality = async (content) => {
        try {
            const { data } = await httpService.put(qualityEndPoint, content);
            return data;
        } catch (error) {
            console.log("ExpectedError");
        }
    };
    const getQuality = async (id) => {
        try {
            const { data } = await httpService.get(qualityEndPoint, id);
            return data;
        } catch (error) {
            console.log("ExpectedError");
        }
    }

    const handleSubmit = (data) => { updateQuality(data) }
    useEffect(() => {
        getQuality(id).then(data=>setQuality(data.content))
    },[]);
    return (
        <>
             <h1>Edit Quality Page</h1>
            {quality!==null?<EditForm data={quality} onSubmit={handleSubmit}/>:"Loading"}
        </>
    );
};

export default EditQualityPage;
