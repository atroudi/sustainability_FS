import React from "react";
import {IndexRedirect, Route} from "react-router";

import Detail from "./views/Detail";
import ListStations from "./views/ListStations";
import List from "./views/List";

import Tabs from "./views/Tabs";
import RecordsGraph from "./views/RecordsGraph";
import RTimeGraph from "./views/RTimeGraph";
import PicTab from "./views/PicTab";

const routes = (
    <Route path="stations" component={List}>
        <Route path=":station" component={Tabs}>
            <IndexRedirect to="images"/>
            <Route path="images" component={PicTab}/>
            <IndexRedirect to="records"/>
            <Route path="records" component={RecordsGraph}/>
            <IndexRedirect to="rtime"/>
            <Route path="rtime" component={RTimeGraph}/>
        </Route>
    </Route>
    
);

export default routes;
