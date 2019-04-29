import {Map, Record} from "immutable";
import constants from "./constants";
import constants_import from "./constants_import";



class DecisionChangeSet extends Record({
    demand:"",
    crop_inventory:"",
    time:"",
    month:"",
    decision_flag:"",
    tmp_grow:"",
    tmp_import:"",
    crop_inventory:"",
    cost:"",
    env:"",
    _errors: Map()
}){}

class Decision extends Record({
    id: "0",
    demand:"",
    crop_inventory:"",
    time:"",
    month:"",
    decision_flag:"",
    tmp_grow:"",
    tmp_import:"",
    crop_inventory:"",
    cost:"",
    env:"",
    constants: constants,
    ChangeSet: DecisionChangeSet,
}) {
    appUrl() {
        return `/admin/crops/${this.id}`;
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
        return `${this.tmp_import}`;
    }
}

class DecisionCollection extends Record({
    apiUrl: window.django.urls.decisions,
    constants: constants,
    ChangeSet: DecisionChangeSet,
    isLoading: false,
    Model: Decision,
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
    routeId: "decision",
    title: "Decisions",
    titleSingular: "Decision"
}){
    appUrl() {
        return "/admin/decisions";
    }

    isFilterActive() {
        return isFilterActive(this.query);
    }
    
}

class ImportChangeSet extends Record({
    full_name:"",
    abbr:"",
    rank:"",
    _errors: Map()
}){}

class Import extends Record({
    id: "0",
    full_name:"",
    abbr:"",
    quantity_import:"",
    rank:"",
    constants: constants_import,
    ChangeSet: ImportChangeSet,
}) {
    appUrl() {
        return `/admin/crops/${this.id}`;
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
        return `${this.abbr} : ${Math.trunc(this.quantity_import)}`;
    }
}

class ImportCollection extends Record({
    apiUrl: window.django.urls.imports,
    constants: constants_import,
    ChangeSet: ImportChangeSet,
    isLoading: false,
    Model: Import,
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
    routeId: "import",
    title: "Import Countries",
    titleSingular: "Import Country"
}){
    appUrl() {
        return "/admin/imports";
    }

    isFilterActive() {
        return isFilterActive(this.query);
    }
    
}

export {
    ImportCollection,
    Import,
    DecisionCollection,
    Decision
};