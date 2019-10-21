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


const sec = 1000;
const minute = 60 * sec;
const hours = 60 * minute;
const rate = 3000;


class Container extends React.Component {

    constructor(props){
        super(props)
        const {actions, collection} =props;
    
        let clean_demand = this.props.params.demand.split("&")[0];
        let month_tmp =1
        if (this.props.location.query.time){
            month_tmp = this.props.location.query.time.split("-")[1];
            this.setState({month: month_tmp})
        }

        this.state = {
            time: new Date(1900, 0, 1),
            events: new Ring(200),
            month: month_tmp
        }

        let query = collection.get("query");
        query = query.set("search", "");
        query = query.set("crop", this.props.params.crop);
        query = query.set("demand", clean_demand);

        console.log("this.props.location.query.__firebase_request_key");
        console.log(this.props.location.query.time)
        console.log(clean_demand)
        console.log(month_tmp)

        // query = query.set("month", this.props.params.month);
        query = query.set("month", month_tmp);
       
        actions.fetchCollection({collection, query});

    }

    getDecisionEvent = t => {
        const base = Math.sin(t.getTime() / 10000000) * 350 + 500;
        // const event = new TimeEvent(t, parseInt(base + Math.random() * 1000, 10));
        const event = new TimeEvent(t, parseInt(base + Math.random() * 1000, 10));

        // send predictionstart date 
        // actions.fetchCollection({collection, query});

        const {actions, collection} = this.props;
        let query = collection.get("query");
        query = query.set("search", "");
        actions.fetchCollection({collection, query});

        return event;
    };

    intialize_events(){

        //
        // Setup our aggregation pipelines
        //
        this.stream = new Stream();
        const increment = minute; 
        this.interval = setInterval(() => {
            const t = new Date(this.state.time.getTime() + increment);
            const dbevent = this.getDecisionEvent(t);
        }, this.props.rate ? this.props.rate : rate ); // Check if there's a rate props passed from parent object
    }


    componentWillMount() { 
        const {actions, collection} = this.props;
        let query = collection.get("query");
        query = query.set("search", "");
        actions.fetchCollection({collection, query});

        this.intialize_events();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
        
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                updateImportCountries: this.props.updateImportCountries,
            });
        });

        // TODO: has to be changed as input
        const month = this.state.month;
        console.log(this.state.month)
        let import_val = 0 
        let grow_val = 0
        let grow_purcentage = 0  
        let import_purcentage = 0 
        var decision;
        this.props.collection.models.map(model => {
            // console.log(model.month)
            if(model.month==this.state.month){
                decision = model;
            }
        })
        
        if (decision){
            grow_val = Math.trunc(decision.tmp_grow)
            import_val = Math.trunc(decision.toString())
            if((grow_val !=0 ) & (import_val !=0)){
                grow_purcentage = Math.trunc(grow_val/(grow_val + import_val))* 100
                import_purcentage = Math.trunc(grow_val/(grow_val + import_val))* 100
                console.log(grow_purcentage, import_purcentage)
            } else if(grow_val !=0 ) {
                grow_purcentage = Math.trunc(grow_val/(grow_val + import_val))* 100
                import_purcentage = Math.trunc(grow_val/(grow_val + import_val))* 100
                console.log(grow_purcentage, import_purcentage)
            } else if(grow_val !=0 ) {
                grow_purcentage = Math.trunc(grow_val/(grow_val + import_val))* 100
                import_purcentage = Math.trunc(grow_val/(grow_val + import_val))* 100
                console.log(grow_purcentage, import_purcentage)
            }

        } else {
            decision = this.props.model
        }



        return(
            <Row>
            <Col sm={6}>
            </Col>
            <Col sm={6}>
            <div className="text-center">

            <Box.Wrapper>
                <Box.Header>
                    <Box.Title>Decision</Box.Title>
                </Box.Header>

                <Box.Tools>
                    </Box.Tools>

                <Box.Body>
                <Row>
                    <Col sm={4}>
                    <InfoBox {...this.props} text={"Grow"} progress={"1"} logo={"fa fa-bookmark-o"} color={"info-box bg-green"} val={grow_val} collection={this.props.collection} />
                    {/* <CollapseBox/> */}
                    {/* <ContainerDetails {...this.props} model={decision} /> */}
                    </Col>
                    <Col sm={8}>
                    <InfoBox {...this.props} text={"Import"} progress={"100"} logo={"fa fa-bookmark-o"} color={"info-box bg-red"} val={import_val} />
                    <div className="text-left">

                    {/* <ImportMap/> */}
                    </div>
                    </Col>
                    {/* <Col sm={1}>
                    </Col> */}

                </Row>
                <Row>
                <Col sm={6}>
                    {/* <CollapseBox/> */}
                    <ContainerDetails {...this.props} model={decision} /> 
                    </Col>
                    <Col sm={6}>
                    
                     <CountryList>
                     {this.props.updateImportCountries}
                     </CountryList>
                    {/* <ImportMap
                    /> */}
                </Col>

                </Row>
                </Box.Body>
            </Box.Wrapper> 
            </div>

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