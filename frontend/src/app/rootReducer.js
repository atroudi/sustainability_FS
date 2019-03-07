import {combineReducers} from "redux";

import adminlte from "adminlte/reducers";
import alerts from "app/reducers/alerts";
import users from "app/users/reducers";
import records from "app/users/recordReducers";
import predictions from "app/users/predictionReducers";

import geolocations from "app/users/Reducers_geolocation";


export default combineReducers({
    adminlte,
    alerts,
    users,
    records,
    predictions,
    geolocations
});
