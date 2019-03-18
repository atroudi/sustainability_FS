import React from "react";
import {IndexRedirect, Route} from "react-router";


import CropContainer from "./views/CropContainer"
import CropSelection from "./views/CropSelection"

const routes = (
    <Route path="crops" component={CropContainer}>
        {/* <Route path=":crop" >
        </Route> */}
    </Route>
    
);

export default routes;
