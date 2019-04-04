import {Map, Record} from "immutable";
import constants from "./constants";



class CropChangeSet extends Record({
    name:"",
    demand:"",
    _errors: Map()
}){}

class Crop extends Record({
    id: "0",
    name:"",
    demand:"",
    constants: constants,
    ChangeSet: CropChangeSet,
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
        return `${this.label}`;
    }
}

class CropCollection extends Record({
    apiUrl: window.django.urls.crops,
    constants: constants,
    ChangeSet: CropChangeSet,
    isLoading: false,
    Model: Crop,
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
    routeId: "crop",
    title: "Crops",
    titleSingular: "Crop"
}){
    appUrl() {
        return "/admin/crops";
    }

    isFilterActive() {
        return isFilterActive(this.query);
    }
    
}

export {
    CropCollection,
    Crop
};