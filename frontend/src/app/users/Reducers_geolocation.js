import collectionReducer from "app/reducers/collection";

import {GeolocationCollection} from "./models";

const initialState = new GeolocationCollection();


function reducer(state = initialState, action) {
    return collectionReducer(state, action, state.constants);
}

export default reducer;