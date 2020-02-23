import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import findModel from "app/components/higherOrder/findModel";
import {createSelector} from "reselect";
import React from "react";
import {Box} from "adminlte";
import actions from "app/actions/collection";
import {Col, Row} from "react-bootstrap";
import InfoBox from "./InfoBox"
import CountryList from "./CountryList";
import { TimeSeries, TimeRange, TimeEvent,
    Pipeline as pipeline,
    Stream,
    EventOut,
    percentile} from "pondjs";
import Ring from "ringjs";
import DecisionControlPanel from './DecisionControlPanel'
import DecisionResultPanel from './DecisionResultPanel'
import ImportMap3 from "./ImportMap3"
import FlightMap from "./FlightMap"
import {contentWrapperMinHeight} from "../../../adminlte/selectors";
import viewportDimensions from "app/utils/viewportDimensions";

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
            month: initial_month,
            import_countries:[],
            decision_models:this.props.collection.models
        }
        // const {actions, collection} = this.props;
        // let query = collection.get("query");
        // query = query.set("search", "");
        // query = query.set("demand", initial_demand);
        // actions.fetchCollection({collection, query});
    }

    _onChangeImportCountries = (new_countries) => {
        // console.log(new_countries)
        this.setState({import_countries: new_countries});
    }

    _onChangeDemand = (variable, new_demand) => {
        if (variable == "demand"){
            this.setState({demand: new_demand});
            const {actions, collection} = this.props;
            let query = collection.get("query");
            query = query.set("search", "");
            query = query.set("demand", new_demand);
            actions.fetchCollection({collection, query});

            // wait for decision task to complete in the back end triggered by the fetch query
            // update with the 

        }
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

    componentWillReceiveProps(nextProps){

        const {props} = this;
        // console.log(props)
        if (props.collection.models !== nextProps.collection.models) {
            console.log("received new predictions");
            this.setState({decision_models: nextProps.collection.models});
        }
    }

    render(){   
        const {children} = this.props;   
        return(
            <div>
                
                <div style={{ width:2000, position:'absolute'}}>
                    {/* <ImportMap3 {...this.props} import_countries= {this.state.import_countries}>
                    </ImportMap3> */}
                    <FlightMap {...this.props} import_countries= {this.state.import_countries}>
                    </FlightMap>
                </div>

                <div >
                    <Row>   
                    <Col sm={3}>
                        <DecisionControlPanel {...this.props} onChange = {this._onChangeDemand} />
                    </Col>
                    <Col sm={3}>
                    </Col>
                    <Col sm={6}>
                        <DecisionResultPanel {...this.props} decision_models={this.state.decision_models} demand={this.state.demand} month={this.state.month} onChangeImportCountries={this._onChangeImportCountries}>
                            {children}
                        </DecisionResultPanel>
                    </Col>    
                    </Row>
                </div>
            </div>           

        )
    }
}


const selector = createSelector(
    (state) => state.decisions,
    (state) => state.adminlte,
    (collection,adminlte) => {
        const dimensions = viewportDimensions();
        const mainFooter = adminlte.mainFooter;
        const mainHeader = adminlte.mainHeader;

        const minHeight = dimensions.height - (
            mainHeader.get("height") 
        );
        return {
            collection,
            contentWrapperMinHeight: minHeight
            // CreateForm
        };
    }
);

const bindActions = (dispatch) => {
    return {actions: bindActionCreators(actions, dispatch)};
};

export default connect(selector, bindActions)(findModel(Container));

// export default connect(contentWrapperMinHeight)(ContentWrapper);
