import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Container from "./components/common/container";
import NavBar from "./components/ui/NavBar";
import routes from "./routes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
    });
};

export const QualitiesContext = React.createContext();
const qualities = [{_id:1224342, name:"kind"}]

function App() {
    return (
        <div className='App'>
            <NavBar routes={routes} />
            <QualitiesContext.Provider value={qualities}>
            <Container>
                <Switch>
                    {getRoutes(routes)}
                    <Redirect to='/' />
                </Switch>
            </Container>
            </QualitiesContext.Provider>
            <ToastContainer/>
        </div>
    );
}

export default App;
