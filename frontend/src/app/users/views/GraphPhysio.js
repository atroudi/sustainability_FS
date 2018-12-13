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
import GraphChartJs2 from "app/components/graphs/GlucoseChartJs2"
import GraphChartJsPhysio from "app/components/graphs/GlucoseChartJsPhysio"
import PhysioChart from "../../components/graphs/PhysioChart";

class Container extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {email: new Date()};
    //   }

    constructor(props) {
        super(props);
        const {actions, collection} = this.props;
        const query = collection.get("query");

        
        actions.fetchCollectionIfEmpty({collection, query});

    }
    
    render() {

        console.log(this.props.params.user)
        return (
            <div>
                {/* <Model {...this.props}/> */}
                {/* <GraphChartJs {...this.props}/> */}
                <PhysioChart {...this.props}/>

                <div className="text-center">
                    {/* <DeleteButton
                        {...this.props}
                        permission="users.delete_emailuser"
                    />
                    <EditForm {...this.props}/> */}
                </div>
            </div>
        );
    }
}

const selector = createSelector(
    (state) => state.records,
    (collection) => {
        return {
            collection,
            // CreateForm,
            // QueryForm
        };
    }
);

const bindActions = (dispatch) => {
    return {actions: bindActionCreators(actions, dispatch)};
};

export default connect(selector, bindActions)(findModel(Container));
