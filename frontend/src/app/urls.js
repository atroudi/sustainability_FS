import React from "react";
import {IndexRedirect, Route} from "react-router";

import Admin from "app/layouts/Admin";
import RouteNotFound from "app/components/RouteNotFound";
import users from "app/users/urls";
import fields from "app/users/urls_fields"
import stations from "app/users/urls_stations"

const urls = (
    <Route path="/">
        <IndexRedirect to="admin/geolocations"/>
        <Route component={Admin} path="admin">
            <IndexRedirect to="geolocations"/>
            {users}
            <IndexRedirect to="fields"/>
            {fields}
            <IndexRedirect to="stations"/>
            {stations}
            <Route path="*" component={RouteNotFound}/>
        </Route>
    </Route>
);

export default urls;
