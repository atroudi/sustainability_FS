import collectionReducer from "app/reducers/collection";

import {UserCollection} from "./models";

const initialState = new UserCollection();


function reducer(state = initialState, action) {
    return collectionReducer(state, action, state.constants);
}

export default reducer;
