import {combineReducers} from "redux";

import adminlte from "adminlte/reducers";
import alerts from "app/reducers/alerts";
import users from "app/users/reducers";
import records from "app/users/recordReducers";


export default combineReducers({
    adminlte,
    alerts,
    users,
    records
});
