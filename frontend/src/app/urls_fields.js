import React from "react";
import {IndexRedirect, Route} from "react-router";

import Admin from "app/layouts/Admin";
import RouteNotFound from "app/components/RouteNotFound";
import users from "app/users/urls";


const urls = (
    <Route path="/">
        <IndexRedirect to="admin/fields"/>
        <Route component={Admin} path="admin">
            <IndexRedirect to="fields"/>
            {users}
            <Route path="*" component={RouteNotFound}/>
        </Route>
    </Route>
);

export default urls;
