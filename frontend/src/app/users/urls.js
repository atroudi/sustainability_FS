import React from "react";
import {IndexRedirect, Route} from "react-router";

import Detail from "./views/Detail";
import List from "./views/List";
import Tabs from "./views/Tabs";
import RecordsGraph from "./views/RecordsGraph";
import FieldHistoricalGraph from "./views/FieldHistoricalGraph";

import RTimeGraph from "./views/RTimeGraph";
import PredictionGraph from "./views/PredictionGraph";
import PicTab from "./views/PicTab";
import SankeyGraph from "./views/SankeyGraph"
import SankeyGraph2 from "./views/SankeyGraph2"

const routes = (
    <Route path="geolocations" component={List}>
        <Route path=":geolocation" component={Tabs}>
            <Route path="field/images" component={PicTab}/>
            <Route path="field/records" component={FieldHistoricalGraph}/>
            <Route path="field/sankey" component={SankeyGraph2}/>
            <Route path="field/prediction" component={PredictionGraph}/>
            <Route path="images" component={PicTab}/>
            <Route path="records" component={RecordsGraph}/>
            <IndexRedirect to="rtime"/>
            <Route path="rtime" component={RTimeGraph}/>
        </Route>
    </Route>
    
);

export default routes;
