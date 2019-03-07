import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import {Col, Row} from "react-bootstrap";

import actions from "app/actions/collection";
import DeleteButton from "app/components/DeleteButton";
import EditForm from "app/users/components/EditForm";
import findModel from "app/components/higherOrder/findModel";
import Model from "app/users/components/Model";

import GraphChartJs from "app/components/graphs/GlucoseChartJs"
import GraphChartJs2 from "app/components/graphs/GlucoseChartJs2"
import GraphChartJsPhysio from "app/components/graphs/GlucoseChartJsPhysio"
import PhysioChart from "../../components/graphs/RTInputChart";
import PredictionChart from "../../components/graphs/PredictionChart";

// import Perf from 'react-addons-perf';
// var Perf = require('react-addons-perf'); 

class PredictionGraph extends React.Component {


    constructor(props) {
        super(props);
        const {actions, collection} = props;
        let query = collection.get("query");
        var geolocation = "";
        if (props.params.geolocation)
            geolocation = props.params.geolocation; 
        else if (props.params.station) 
            geolocation = props.params.station; 
        else if (props.params.field)
            geolocation = props.params.field; 
        else 
            throw "couldn't find geolocation id, so database query is not filtered! "

        query = query.set("search", geolocation);
        actions.fetchCollection({collection, query});
    }
    
    
    componentWillReceiveProps(nextProps) {
        const {props} = this;
        const {actions, collection} = props;
        let query = collection.get("query");

        if (props.params.geolocation !== nextProps.params.geolocation){
            console.log("new geolocation")
            query = query.set("search", nextProps.params.geolocation);
            actions.fetchCollection({collection, query});
        }
    }
    
    render() {
        const rowOneWidth = 4;
        return (
            <div>
                {/* <Model {...this.props}/> */}
                {/* <GraphChartJs {...this.props}/> */}
                <Row>
                <Col sm={rowOneWidth}>
                <PhysioChart  variable="Average Temperature" maxValue="50" {...this.props}/>
                </Col>
                <Col sm={rowOneWidth}>

                <PhysioChart  variable="Average Humidity" maxValue="100" {...this.props}/>
                </Col>

                <Col sm={rowOneWidth}>
                <PhysioChart  variable="Solar Radiation" maxValue="10" {...this.props}/>
                </Col>

                </Row>
                <Row xs={10}>
                
                <Col sm={12}>
                <PredictionChart  variable="Water Demand" maxValue="10000" rate="2000" {...this.props}/>
                </Col>
                </Row>

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

export default connect(selector, bindActions)(findModel(PredictionGraph));
