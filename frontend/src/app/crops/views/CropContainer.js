import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import React from "react";

import actions from "app/actions/collection";
import CropSelection from "./CropSelection";

class Container extends React.Component {

    render(){
        let nextUrl = this.props.routes[2].path;
        return(
            <div className="text-center">
                <CropSelection titleSingular="Select crop to grow" entry="/admin/geolocations" {...this.props} />
            </div>
        )
    }
}

const selector = createSelector(
    (state) => state.geolocations,
    (collection) => {
        return {
            collection,
            // CreateForm
        };
    }
);

const bindActions = (dispatch) => {
    return {actions: bindActionCreators(actions, dispatch)};
};

export default connect(selector, bindActions)(Container);