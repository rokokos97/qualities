import React, {useContext, useEffect, useState} from "react";
import qualityService from "../services/quality.Service";

const QualitiesContext = React.createContext();
export const  useQualities = () => {
    return useContext(QualitiesContext);
};
export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState();
    useEffect(()=>{
        const getQualities = async () => {
            try {
                const qualities = await qualityService.fetchAll()
                setQualities(qualities)
            } catch (error){

            }
        }
    })
    return <QualitiesContext.Provider value={qualities}>
        {children}
    </QualitiesContext.Provider>
}