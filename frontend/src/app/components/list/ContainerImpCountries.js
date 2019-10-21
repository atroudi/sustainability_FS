import React from "react";
import {Col, Row} from "react-bootstrap";
import GraphChartJs from "../graphs/GlucoseChartJs"

import Box from "./Box2";
import { TimeSeries, TimeRange, TimeEvent,
    Pipeline as pipeline,
    Stream,
    EventOut,
    percentile} from "pondjs";
import Ring from "ringjs";

const sec = 1000;
const minute = 60 * sec;
const hours = 60 * minute;
const rate = 8000;

class Container extends React.Component {

    constructor(props){
        super(props)
        const {actions, collection} =props;
        this.state = {
            time: new Date(1900, 0, 1),
            events: new Ring(200),
        }

    }

    getDecisionEvent = t => {
        const base = Math.sin(t.getTime() / 10000000) * 350 + 500;
        // const event = new TimeEvent(t, parseInt(base + Math.random() * 1000, 10));
        const event = new TimeEvent(t, parseInt(base + Math.random() * 1000, 10));

        // send predictionstart date 
        // actions.fetchCollection({collection, query});

        const {actions, collection} = this.props;
        let query = collection.get("query");
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
        actions.fetchCollection({collection, query});

        this.intialize_events();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // componentDidMount() {
    //     const {actions, collection} = this.props;
    //     const query = collection.get("query");
    //     actions.fetchCollection({collection, query});
    // }

    render() {
        const {rowOneWidth = 3, rowTwoWidth = 8} = this.props;
        var country_list = []
        this.props.collection.models.toList()
        .map((model, key) =>{
            if (model.quantity_import){
                country_list.push(model.abbr)

            }
        })
        this.props.children(country_list)

        console.log(country_list)
        return (
            <div className="countries-panel">
                <Box {...this.props}/>
            </div>
        );
    }
}

export default Container;
