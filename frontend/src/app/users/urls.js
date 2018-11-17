import React from "react";
import {IndexRedirect, Route} from "react-router";

import Detail from "./views/Detail";
import List from "./views/List";
import Tabs from "./views/Tabs";
import Graph from "./views/Graph";
import GraphPhysio from "./views/GraphPhysio";
import FoodPicDisplay from "./views/FoodPicDisplay";

const routes = (
    <Route path="users" component={List}>
        <Route path=":user" component={Tabs}>
            
            <IndexRedirect to="physio"/>
            <Route path="physio" component={GraphPhysio}/>
            <IndexRedirect to="food"/>
            <Route path="food" component={FoodPicDisplay}/>
            <IndexRedirect to="details"/>
            <Route path="details" component={Graph}/>
        </Route>
    </Route>
);

export default routes;
