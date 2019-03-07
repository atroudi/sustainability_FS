import React from "react";
import {IndexRedirect, Route} from "react-router";

import Detail from "./views/Detail";
import List from "./views/List";
import Tabs from "./views/Tabs";
import RecordsGraph from "./views/RecordsGraph";
import RTimeGraph from "./views/RTimeGraph";
import PicTab from "./views/PicTab";
import Sankey from "./views/SankeyGraph"

const routes = (
    <Route path="fields" component={List}>
        <Route path=":field" component={Tabs}>
            <Route path="images" component={PicTab}/>
            <Route path="records" component={RecordsGraph}/>
            {/* <Route path="sankey" component={Sankey}/> */}
            <IndexRedirect to="rtime"/>
            <Route path="rtime" component={RTimeGraph}/>
        </Route>
    </Route>
    
);

export default routes;
