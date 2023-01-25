import React, {useContext, useEffect, useState, useRef} from "react";
import qualityService from "../services/qualityService";
import {toast} from "react-toastify";

const QualitiesContext = React.createContext();
export const  useQualities = () => {
    return useContext(QualitiesContext);
};
export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState([]);
    const [, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const prevState = useRef();
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
    const addQuality = async (data) => {
        try {
            const {content} = await qualityService.create(data);
            setQualities(prevState => [...prevState,content]);
            return content
        } catch (error){
            const { message } = error.response.data
            setError(message);
        }

    }
    const deleteQuality = async (id) => {
        prevState.current= qualities
        setQualities(prevState => {
            return prevState.filter((item)=>item._id !== id)
        })
        try {
            await qualityService.delete(id);
        } catch (error){
            const { message } = error.response.data
            setError(message);
            setQualities(prevState.current)
        }
    }
    const updateQuality = async ({_id: id,...data}) => {
        try {
            const {content} = await qualityService.update(id,data);
            setQualities(prevState => prevState.map((item)=>{
                if(item._id === content._id){
                    return content
                }
                return item;
            }))
            return content
        } catch (error){
            const { message } = error.response.data
            setError(message);
        }
        }
    return <QualitiesContext.Provider value={{qualities, getQuality, updateQuality, addQuality, deleteQuality}}>
        {!isLoading
            ? children
            : <h1>Qualities Loading...</h1>
        }

    </QualitiesContext.Provider>
}