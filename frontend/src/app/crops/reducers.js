import collectionReducer from "app/reducers/collection";

import {CropCollection} from "./models";

const initialState = new CropCollection();


function reducer(state = initialState, action) {
    return collectionReducer(state, action, state.constants);
}

export default reducer;
