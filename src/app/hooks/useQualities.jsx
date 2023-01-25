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
    const [, setIsLoading] = useState(true);
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
    return <QualitiesContext.Provider value={{qualities}}>
        {children}
    </QualitiesContext.Provider>
}