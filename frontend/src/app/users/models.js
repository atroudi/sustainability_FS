import {Map, Record} from "immutable";

import isFilterActive from "app/utils/isFilterActive";
import constants from "./constants";
import constantsRecords from "./constantsRecords";


class ChangeSet extends Record({
    first_name: "",
    last_name: "",
    email: "",
    _errors: Map()
}){}

class RecordChangeSet extends Record({
    owner:"",
    api_secret: "",
    _errors: Map()
}){}

/**
 * RECORDP (PUTTING WITH TO AVOID CONFUSION WITH IMMUTABLE.CLASS) MODEL DEFINITION AND INTITIALIZATION
 */

class RecordP extends Record({
    id: "234",
    constants: constantsRecords,
    ChangeSet,
    api_secret: "",
    sgv: "",
    direction: "",
    sysTime: "",
    dateString: "",
    rawData: "",
    owner: ""
}) {
    appUrl() {
        return `/admin/records/${this.id}`;
    }

    // tabUrl(tab = "details") {
    //     return `${this.appUrl()}/${tab}`;
    // }

    apiUrl() {
        return `${window.django.urls.records}${this.id}/`;
    }

    getSgv(){
        return this.sgv;
    }

    getDate(){
        return `${this.sysTime}`;
    }

    // Will filter all records with the username (email) of current user model
        // Add record model
            // with filter through email
            // get SGV and convert it to list
            // use the return result in get Entries
    getEntries(){
        return [0,100,300];
    }

    toString() {
        return `${this.id}`;
    }
}

class RecordCollection extends Record({
    apiUrl: window.django.urls.records,
    constants: constantsRecords,
    ChangeSet,
    isLoading: false,
    Model: RecordP,
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
    title: "Records",
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
    RecordCollection,
    RecordP,
    UserCollection,
    User
};
