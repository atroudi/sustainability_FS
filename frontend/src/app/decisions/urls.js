import React from "react";
import {IndexRedirect, Route} from "react-router";


import CropContainer from "./views/CropContainer"
import DemandContainer from "./views/DemandContainer"

import DecisionContainer from "./views/DecisionContainer"

const routes = (
    <Route path="decision" >
        <IndexRedirect to="crops"/>
            <Route path="crops" component={CropContainer}>
                <Route path=":crop" component={DemandContainer}>
                    {/* <IndexRedirect to="demands"/> */}
                    {/* <Route path="demands" component={DecisionContainer}> */}
                        <Route path=":demand*" component={DecisionContainer}>
                        
                        {/* </Route> */}
                    </Route>
                </Route>
        </Route>
    </Route>
    
);

export default routes;
