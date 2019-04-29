import collectionReducer from "app/reducers/collection";

import {DecisionCollection} from "./models";

const initialState = new DecisionCollection();


function reducer(state = initialState, action) {
    return collectionReducer(state, action, state.constants);
}

export default reducer;