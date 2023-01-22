import React, { useEffect, useState } from "react";
import EditForm from "../components/ui/editForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditQualityPage = () => {
    const [quality, setQuality] = useState(null);
    const id = useParams().id
    const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}`
    axios.interceptors.response.use((res) => res, function (error){
        const expectedError = error.response.status && error.response.status>=400 && error.response.status<500;
        if(!expectedError){ console.log("UnexpectedError")}

    })
    const handleSubmit = async (data) => {
      try {
          axios
              .put(qualityEndPoint, data)
              .then((result)=> console.log(result.data.content));
      } catch (error) {
          const expectedError = error.response.status && error.response.status>=400 && error.response.status<500;
          if(!expectedError){ console.log("UnexpectedError")}else{
              console.log("ExpectedError");
          }
      }

    }
    useEffect(async () => {
        const { data } = await axios.get(qualityEndPoint)
        setQuality(data.content)
    },[]);
    return (
        <>
             <h1>Edit Quality Page</h1>
            {quality!==null?<EditForm data={quality} onSubmit={handleSubmit}/>:"Loading"}
        </>
    );
};

export default EditQualityPage;
