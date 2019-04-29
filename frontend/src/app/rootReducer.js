import {combineReducers} from "redux";

import adminlte from "adminlte/reducers";
import alerts from "app/reducers/alerts";
import users from "app/users/reducers";
import records from "app/users/recordReducers";
import predictions from "app/users/predictionReducers";
import geolocations from "app/users/Reducers_geolocation";
import crops from "app/crops/reducers"
import decisions from "app/decisions/reducers"
import imports from "app/decisions/reducers_import"

export default combineReducers({
    adminlte,
    alerts,
    users,
    records,
    predictions,
    geolocations,
    crops,
    decisions,
    imports
});
