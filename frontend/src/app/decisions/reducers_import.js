import collectionReducer from "app/reducers/collection";

import {ImportCollection} from "./models";

const initialState = new ImportCollection();


function reducer(state = initialState, action) {
    return collectionReducer(state, action, state.constants);
}

export default reducer;