import {Map, Record} from "immutable";

import isFilterActive from "app/utils/isFilterActive";
import constants from "./constants";
import constantsRecords from "./constantsRecords";
import constantsGeolocation from "./constantsGeolocation";
import constantsPrediction from "./constantsPrediction";


class GeolocationChangeSet extends Record({
    label:"",
    lat: "",
    lng:"",
    is_field:"",
    crop:"",
    _errors: Map()
}){}

/**
 * RECORDP (PUTTING WITH TO AVOID CONFUSION WITH IMMUTABLE.CLASS) MODEL DEFINITION AND INTITIALIZATION
 */

class Geolocation extends Record({
    id: "0",
    label:"",
    lat: "",
    lng:"",
    crop:"",
    is_field:"",
    constants: constantsGeolocation,
    ChangeSet: GeolocationChangeSet,
}) {
    appUrl() {
        return `/admin/geolocations/${this.id}`;
    }

    tabUrl(tab = "details") {
        return `${this.appUrl()}/${tab}`;
    }

    tabUrl2(tab1, tab2 ) {
        return `/admin/${tab1}/${this.id}/${tab2}`;
    }
    apiUrl() {
        return `${window.django.urls.geolocations}${this.id}/`;
    }

    toString() {
        return `${this.label}`;
    }
}

class GeolocationCollection extends Record({
    apiUrl: window.django.urls.geolocations,
    constants: constantsGeolocation,
    ChangeSet: GeolocationChangeSet,
    isLoading: false,
    Model: Geolocation,
    models: Map(),
    pagination: Map({
        end_index: 0,
        page: 0,
        start_index: 0,
        total_pages: 0
    }),
    query: Map({
        page: 1,
        search: ""
    }),
    routeId: "geolocation",
    title: "Geolocations",
    titleSingular: "Geolocation"
}){
    appUrl() {
        return "/admin/geolocations";
    }

    isFilterActive() {
        return isFilterActive(this.query);
    }
    
}

class RecordChangeSet extends Record({
    temp_avg:"",
    humidity_avg:"",
    precipitation:"",
    wind_avg:"",
    gust_max:"",
    solar_radiation:"",
    water_loss:"",
    time: "",
    label:"",
    geolocation:"",
    _errors: Map()
}){}

/**
 * RECORDP (PUTTING WITH TO AVOID CONFUSION WITH IMMUTABLE.CLASS) MODEL DEFINITION AND INTITIALIZATION
 */

class RecordG extends Record({
    id: "0",
    temp_avg:"",
    humidity_avg:"",
    precipitation:"",
    wind_avg:"",
    gust_max:"",
    solar_radiation:"",
    water_loss:"",
    time: "",
    label:"",
    geolocation:"",
    constants: constantsRecords,
    ChangeSet: RecordChangeSet,
}) {
    appUrl() {
        return `/admin/records/${this.id}`;
    }

    tabUrl(tab = "details") {
        return `${this.appUrl()}/${tab}`;
    }

    apiUrl() {
        return `${window.django.urls.records}${this.id}/`;
    }

    toString() {
        return `${this.id}`;
    }

    getValue( variable ) {
        if (variable==="Average Humidity")
            return this.humidity_avg;
        else if (variable==="Average Temperature")
            return this.temp_avg;
        else if (variable==="Precipitation")
            return this.precipitation;
        else if (variable==="wind Average")
            return this.wind_avg;
        else if (variable==="Gust max")
            return this.gust_max;
        else if (variable==="Solar Radiation")
            return this.solar_radiation;
        else if (variable==="Water Demand")
            return this.water_loss;
        else
            console.log('Wrong input variable!');
    }
}

class RecordCollection extends Record({
    apiUrl: window.django.urls.records,
    constants: constantsRecords,
    ChangeSet: RecordChangeSet,
    isLoading: false,
    Model: RecordG,
    models: Map(),
    pagination: Map({
        end_index: 0,
        page: 0,
        start_index: 0,
        total_pages: 0
    }),
    query: Map({
        page: 1,
        search: ""
    }),
    routeId: "records",
    title: "Records",
    titleSingular: "RecordP"
}){
    appUrl() {
        return "/admin/records";
    }

    isFilterActive() {
        return isFilterActive(this.query);
    }
}


class PredictionChangeSet extends Record({
    temp_avg:"",
    humidity_avg:"",
    solar_radiation:"",
    water_actual:"",
    water_loss:"",
    time: "",
    label:"",
    geolocation:"",
    crop:"",
    _errors: Map()
}){}

/**
 * RECORDP (PUTTING WITH TO AVOID CONFUSION WITH IMMUTABLE.CLASS) MODEL DEFINITION AND INTITIALIZATION
 */

class Prediction extends Record({
    id: "0",
    temp_avg:"",
    humidity_avg:"",
    solar_radiation:"",
    water_actual:"",
    water_loss:"",
    time: "",
    label:"",
    geolocation:"",
    constants: constantsPrediction,
    ChangeSet: PredictionChangeSet,
}) {
    appUrl() {
        return `/admin/predictions/${this.id}`;
    }

    tabUrl(tab = "details") {
        return `${this.appUrl()}/${tab}`;
    }

    apiUrl() {
        return `${window.django.urls.records}${this.id}/`;
    }

    toString() {
        return `${this.id}`;
    }

    getValue( variable ) {
        if (variable==="Average Humidity")
            return this.humidity_avg;
        else if (variable==="Average Temperature")
            return this.temp_avg;
        else if (variable==="Solar Radiation")
            return this.solar_radiation;
        else if (variable==="Water Demand")
            return this.water_loss;
        else if (variable==="Water Loss Actual")
            return this.water_loss_actual;
        else
            console.log('Wrong input variable!');
    }
}

class PredictionCollection extends Record({
    apiUrl: window.django.urls.predictions,
    constants: constantsPrediction,
    ChangeSet: PredictionChangeSet,
    isLoading: false,
    Model: Prediction,
    models: Map(),
    pagination: Map({
        end_index: 0,
        page: 0,
        start_index: 0,
        total_pages: 0
    }),
    query: Map({
        page: 1,
        search: ""
    }),
    routeId: "records",
    title: "Records",
    titleSingular: "RecordP"
}){
    appUrl() {
        return "/admin/records";
    }

    isFilterActive() {
        return isFilterActive(this.query);
    }
}

class ChangeSet extends Record({
    first_name: "",
    last_name: "",
    email: "",
    _errors: Map()
}){}

class User extends Record({
    id: "0",
    constants,
    ChangeSet,
    date_joined: "",
    email: "",
    first_name: "",
    last_login: "",
    last_name: "",
    last_updated: "",
    is_staff:"",
    is_superuser: new Boolean(false)
    // records: new RecordCollection()
}) {
    appUrl() {
        return `/admin/users/${this.id}`;
    }

    tabUrl(tab = "details") {
        return `${this.appUrl()}/${tab}`;
    }

    apiUrl() {
        return `${window.django.urls.users}${this.id}/`;
    }

    getId(){
        return this.id;
    }

    // Will filter all records with the username (email) of current user model
        // Add record model
            // with filter through email
            // get SGV and convert it to list
            // use the return result in get Entries
    getEntries(){
        return [0,100,200];
    }

    toString() {
        return `${this.first_name} ${this.last_name}`;
    }
    
}

class UserCollection extends Record({
    apiUrl: window.django.urls.users,
    constants,
    ChangeSet,
    isLoading: false,
    Model: User,
    models: Map(),
    pagination: Map({
        end_index: 0,
        page: 0,
        start_index: 0,
        total_pages: 0
    }),
    query: Map({
        page: 1,
        search: ""
    }),
    routeId: "user",
    title: "Patients",
    titleSingular: "User"
}){
    appUrl() {
        return "/admin/users";
    }

    isFilterActive() {
        return isFilterActive(this.query);
    }
}



export {
    GeolocationCollection,
    Geolocation,
    RecordCollection,
    RecordG,
    PredictionCollection,
    Prediction,
    UserCollection,
    User
};
