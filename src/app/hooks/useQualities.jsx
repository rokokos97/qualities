import React, {useContext} from "react";

const QualitiesContext = React.createContext();
export const  useQualities = () => {
    return useContext(QualitiesContext);
};

const qualities = [{_id:1224342, name:"kind"}]
export const QualitiesProvider = ({children}) => {
    return <QualitiesContext.Provider value={qualities}>
        {children}
    </QualitiesContext.Provider>
}