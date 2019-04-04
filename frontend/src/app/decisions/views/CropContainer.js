import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import React from "react";

import actions from "app/actions/collection";
import CropSelection from "./CropSelection";

class Container extends React.Component {

    render(){
        const {children} = this.props;
        return(
            <div className="text-center">
                <CropSelection titleSingular="Select crop to grow" entry="name" {...this.props} />
                {children}
            </div>
        )
    }
}

const selector = createSelector(
    (state) => state.crops,
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