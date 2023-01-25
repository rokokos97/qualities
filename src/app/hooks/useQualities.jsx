import React, {useContext, useEffect, useState} from "react";
import qualityService from "../services/quality.Service";
import {toast} from "react-toastify";

const QualitiesContext = React.createContext();
export const  useQualities = () => {
    return useContext(QualitiesContext);
};
export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState([]);
    const [, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const getQualities = async () => {
            try {
                const qualities = await qualityService.fetchAll()
                setQualities(qualities.content);
                setIsLoading(false);
            } catch (error){
                const { message } = error.response.data
                toast.error(message);
                setError(message)
            }
        }
        getQualities();
    }, []);
    const getQuality = (id) => {
        return qualities.find((q)=>q._id===id);
    }
    return <QualitiesContext.Provider value={{qualities, getQuality}}>
        {!isLoading
            ? children
            : <h1>Qualities Loading...</h1>
        }

    </QualitiesContext.Provider>
}