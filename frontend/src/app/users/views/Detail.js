import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";

import actions from "app/actions/collection";
import DeleteButton from "app/components/DeleteButton";
import EditForm from "app/users/components/EditForm";
import findModel from "app/components/higherOrder/findModel";
import Model from "app/users/components/Model";

import GraphChartJs from "app/components/graphs/GlucoseChartJs"

class Container extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Model {...this.props}/>
                <GraphChartJs {...this.props}/>

                <div className="text-center">
                    <DeleteButton
                        {...this.props}
                        permission="users.delete_emailuser"
                    />
                    <EditForm {...this.props}/>
                </div>
            </div>
        );
    }
}

const selector = createSelector(
    (state) => state.reducer,
    (collection) => {
        return {
            collection
        };
    }
);

const bindActions = (dispatch) => {
    return {actions: bindActionCreators(actions, dispatch)};
};

export default connect(selector, bindActions)(findModel(Container));
