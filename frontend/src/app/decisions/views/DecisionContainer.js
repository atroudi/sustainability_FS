import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import findModel from "app/components/higherOrder/findModel";
import {createSelector} from "reselect";
import React from "react";
import {Box} from "adminlte";
import actions from "app/actions/collection";
import {Col, Row} from "react-bootstrap";
import InfoBox from "./InfoBox"
import ContainerDetails from "app/components/list/ContainerDetails";
import CountryList from "./CountryList";
import ContainerImpCountries from "app/components/list/ContainerImpCountries";
import { TimeSeries, TimeRange, TimeEvent,
    Pipeline as pipeline,
    Stream,
    EventOut,
    percentile} from "pondjs";
import Ring from "ringjs";
import DecisionControlPanel from './DecisionControlPanel'
import DecisionResultPanel from './DecisionResultPanel'

class Container extends React.Component {

    constructor(props){
        super(props);
        let initial_demand = parseInt(this.props.params.demand);

        let initial_month =1

        if (this.props.location.query.time){
            initial_month = this.props.location.query.time.split("-")[1];
        }

        this.state = {
            demand: initial_demand,
            month: initial_month
        }
    }

    _onChangeDemand = (variable, new_demand) => {
        console.log(new_demand);
        if (variable == "demand")
            this.setState({demand: new_demand});
        else if (variable =="temperature")
            this.setState({});
        else
            console.warn("Invalid variable.")
    } 
    
    // componentDidMount(){
    //     const {actions, collection} = this.props;
    //     let query = collection.get("query");
    //     query = query.set("search", "");
    //     actions.fetchCollection({collection, query});
    // }

    // componentWillReceiveProps(nextProps){

    //     const decision = nextProps.collection.models
    //     .reduce(model => model.month==1)
    //     if (decision){
    //         console.log(decision.tmp_import)
    //     }
    // }

    render(){      
        
    
        return(
            <Row>
            <Col sm={3}>
                <DecisionControlPanel {...this.props} onChange = {this._onChangeDemand} />
            </Col>
            <Col sm={3}>
            </Col>
            <Col sm={6}>
                <DecisionResultPanel {...this.props} demand={this.state.demand} month={this.state.month} />
            </Col>    
            </Row>           

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

export default connect(selector, bindActions)(findModel(Container));