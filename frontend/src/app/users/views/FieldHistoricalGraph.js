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
import Map from "../../components/graphs/Map"

class Container extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {email: new Date()};
        const {collection, actions} = this.props;
        let query = collection.get("query");
        query = query.set("search", props.params.geolocation);
        actions.fetchCollectionIfEmpty({collection,query});
      }

    componentWillReceiveProps(nextProps) {

        const {props} = this;
        const {actions, collection} = props ;
        let query = collection.get("query");
        if (props.params.geolocation !== nextProps.params.geolocation){
            query = query.set("search", nextProps.params.geolocation);
            actions.fetchCollection({collection, query});
        }
    }

    render() {

        return (
            <div>
                {/* <Model {...this.props}/> */}
                <GraphChartJs2 variable="Average Temperature" {...this.props}/>
                <GraphChartJs2 variable="Average Humidity" {...this.props}/>
                <GraphChartJs2 variable="Solar Radiation" {...this.props}/>

                {/* <GraphChartJs2 variable="cwd" {...this.props}/> */}
                {/* <GraphChartJs2 variable="smoist" {...this.props}/> */}

                {/* <Map/> */}

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

export default connect(selector, bindActions)(Container);
