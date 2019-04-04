import React from "react";
import {IndexRedirect, Route} from "react-router";

import Admin from "app/layouts/Admin";
import RouteNotFound from "app/components/RouteNotFound";
import users from "app/users/urls";
import fields from "app/users/urls_fields"
import stations from "app/users/urls_stations"
import crops from "app/crops/urls";
import home from "app/home/urls";
import decisions from "app/decisions/urls";


const urls = (
    <Route path="/">
        <IndexRedirect to="admin/home"/>
        <Route component={Admin} path="admin">
            <IndexRedirect to="home"/>
            {home}
            {crops}
            {/* <IndexRedirect to="geolocations"/> */}
            {users}
            {/* <IndexRedirect to="fields"/> */}
            {fields}
            {/* <IndexRedirect to="stations"/> */}
            {stations}
            {decisions}
            <Route path="*" component={RouteNotFound}/>
        </Route>
    </Route>
);

export default urls;
