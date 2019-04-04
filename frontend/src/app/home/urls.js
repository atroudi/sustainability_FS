import React from "react";
import {IndexRedirect, Route} from "react-router";


import HomeContainer from "./views/HomeContainer"

const routes = (
    <Route path="home" component={HomeContainer}>
        {/* <Route path=":crop" >
        </Route> */}
    </Route>
    
);

export default routes;
