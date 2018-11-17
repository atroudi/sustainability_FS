import collectionReducer from "app/reducers/collection";

import {RecordCollection} from "./models";

const initialState = new RecordCollection();


function reducer(state = initialState, action) {
    return collectionReducer(state, action, state.constants);
}

export default reducer;