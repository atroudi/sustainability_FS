import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";

import actions from "app/actions/collection";

import findModel from "app/components/higherOrder/findModel";
import Model from "./Model";

class Container extends React.Component {
    render() {
        return (
            <div>
                <Model {...this.props}/>
            </div>
            
        );
    }
}

// const selector = createSelector(
//     (state) => state.decisions,
//     (collection) => {
//         return {
//             collection
//         };
//     }
// );

// const bindActions = (dispatch) => {
//     return {actions: bindActionCreators(actions, dispatch)};
// };

// export default connect(selector, bindActions)(findModel(Container));

export default Container;