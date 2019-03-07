import collectionReducer from "app/reducers/collection";

import {PredictionCollection} from "./models";

const initialState = new PredictionCollection();


function reducer(state = initialState, action) {
    return collectionReducer(state, action, state.constants);
}

export default reducer;