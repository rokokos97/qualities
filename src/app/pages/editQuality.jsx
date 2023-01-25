import React from "react";
import QualityForm from "../components/ui/qualityForm";
import { useParams } from "react-router-dom";
import qualityService from "../services/quality.Service";
import {toast} from "react-toastify";
import {useQualities} from "../hooks/useQualities";

const EditQualityPage = () => {
    const id = useParams().id
    const quality = useQualities().getQuality(id)
    console.log("quality", quality);
    const updateQuality = async (content) => {
        try {
            const data = await qualityService.update(id,content);
            return data.content
        } catch (error){
            const { message } = error.response.data
            toast.error(message)
        }
    };
    const handleSubmit = (data) => {
        console.log(data);
        updateQuality(data)
    };
    return (
        <>
             <h1>Edit Quality Page</h1>
            <QualityForm data={quality} onSubmit={handleSubmit}/>
        </>
    );
};

export default EditQualityPage;
