import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import React from "react";

import actions from "app/actions/collection";
import DemandSelection from "./DemandSelection"
// import CropSelection from "../../crops/views/CropSelection";

class Container extends React.Component {

    render(){
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                updateImportCountries: this.props.updateImportCountries,
            });
        });
        console.log(this.props)

        return(<div>

                <DemandSelection titleSingular="Enter target demand" entry="demand" {...this.props} />
                {children}
            </div>
        )
    }
}

const selector = createSelector(
    (state) => state.decisions,
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