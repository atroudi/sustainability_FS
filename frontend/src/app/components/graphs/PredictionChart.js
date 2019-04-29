import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import findModel from "app/components/higherOrder/findModel";
import actions from "app/actions/collection";

import ReactDOM from "react-dom";
import { format } from "d3-format";
import { TimeSeries, TimeRange, TimeEvent,
    Pipeline as pipeline,
    Stream,
    EventOut,
    percentile} from "pondjs";
import _ from "underscore";

import { styler, Charts, ChartContainer, ChartRow, YAxis, BarChart, ScatterChart, LineChart, Legend, Resizable } from "react-timeseries-charts";

import Ring from "ringjs";



const sec = 1000;
const minute = 60 * sec;
const hours = 60 * minute;
const rate = 200;

const ActualStyle = styler([
    { color: "#6b948a" }
]);

function buildPoints_prediction_actual(props) {
    const {collection} = props;
    let Enry_Date = [];
    var prediction = [];
    var actual = [];
    var dates = [];
    var start = Date.now();
    collection.models.toList().
    sort((a, b) => a.id - b.id).
    map((model, key) => {
            let date = new Date(model.time);
            let ms = Date.parse(date);
            dates.push(ms);
            prediction.push(parseInt(model.getValue(props.variable)))
            actual.push(parseInt(model.water_actual))

    });
    Enry_Date=[dates, prediction, actual];
    var end = Date.now();
    var elapsed = end - start;
    return Enry_Date;
}

class PredictionChart extends React.Component {
    static displayName = "AggregatorDemo";
    constructor(props){
        super(props);

        const {actions, collection} = props;
        let query = collection.get("query");
        query = query.set("week", 0);
        actions.fetchCollection({collection, query});

        // Get points 
        let points = buildPoints_prediction_actual(props);
        this.state = {
            tracker: null,
            x: null,
            y: null,
            time: new Date(1900, 0, 1),
            events: new Ring(200),
            actualevents: new Ring(200),
            percentile50Out: new Ring(100),
            percentile90Out: new Ring(100),
            predictionStep: 0,
            actual: points[2],
            predictions: points[1], // Contains Y values
            dates: points[0], // Contains time series for X axis
            count: 0, // is count number for the displayed points
            countMax: points[0].length, // Calculates total Y entries  
            lastDate: new Date(1900, 0, 1), // last date displayed
            week: 0 // Prediction week
        };
    }

    handleTrackerChanged = tracker => {
        if (!tracker) {
            this.setState({ tracker, x: null, y: null });
        } else {
            this.setState({ tracker });
        }
    };

    getPredictionsEvent = t => {
        const base = Math.sin(t.getTime() / 10000000) * 350 + 500;
        // const event = new TimeEvent(t, parseInt(base + Math.random() * 1000, 10));
        const event = new TimeEvent(t, parseInt(base + Math.random() * 1000, 10));

        // send predictionstart date 
        // actions.fetchCollection({collection, query});

        const {actions, collection} = this.props;
        let query = collection.get("query");
        query = query.set("week", this.state.week);
        actions.fetchCollection({collection, query});

        return event;
    };

    intialize_events(){
        //
        // Setup our aggregation pipelines
        //
        this.stream = new Stream();

    
        //
        // Setup our interval to advance the time and generate raw events
        //
        
        const increment = minute; 
        this.interval = setInterval(() => {
            const t = new Date(this.state.time.getTime() + increment);
            const dbevent = this.getPredictionsEvent(t);
            const newLastDate = new Date(this.state.dates[this.state.countMax-1])
            if (this.state.lastDate.toDateString()===newLastDate.toDateString()){
                // exit
                console.log("Waiting to load new predictions..")
                // Skip to next week
                this.setState({week: this.state.week + 1})
                return
            }
                
            if (this.state.count < this.state.countMax)  {
                for (const index in this.state.predictions){
                    const t = new Date(this.state.dates[index]);
                    const event = new TimeEvent(t, this.state.predictions[index]);
                    const actualevent = new TimeEvent(t, this.state.actual[index]);

                    // Prediction events
                    const newEvents = this.state.events;
                    newEvents.push(event);

                    // actual events
                    const newActualEvents = this.state.actualevents;
                    newActualEvents.push(actualevent);

                    this.setState({ time: t, events: newEvents, actualevents: newActualEvents });

                    // Let our aggregators process the event
                    this.stream.addEvent(event);
                    this.stream.addEvent(actualevent);

                    // Update entry count
                    this.setState({count: this.state.count + 1 })

                    // Update last date
                    this.setState({lastDate: t})
                }
            } else {
                // Set the count to be
                // Case finished all Y entries it sould wait if new values to be populated
                console.log("No more predictions..")
            }
        }, this.props.rate ? this.props.rate : rate ); // Check if there's a rate props passed from parent object
    }


    componentWillReceiveProps(nextProps) {
        
        const {collection} = nextProps;
        let points = buildPoints_prediction_actual(nextProps);
        // Reset events
        this.setState({
            actual:points[2],
            predictions:points[1],
            dates:points[0],
            // time: new Date(1900, 0, 1),
            // events: new Ring(200),
            // percentile50Out: new Ring(100),
            // percentile90Out: new Ring(100),
            predictionStep: 8, // how many predictions [8 predictions each time]
            count: 0,
            countMax: points[0].length
        });
        // clearInterval(this.interval);
        
    }
 
    // # TODO: Change the below to didmount cause it will load the data after modification made in the constructor function
    componentWillMount() { 
        const {actions, collection} = this.props;
        let query = collection.get("query");
        // query = query.set("week", 0);
        actions.fetchCollection({collection, query});
        console.log("2 fetch done")

        this.intialize_events();
    }

    // Yeah why not keeping this in case the user is navigating through tabs and you want to reinitialize prediction data everytime as the 
    // Actually it's quite important one; atherwise it will break everytime it loads this graph from previous disconnected prediction state
    componentWillUnmount() {
        const {actions, collection} = this.props;
        let query = collection.get("query");
        query = query.set("week", 0);
        actions.fetchCollection({collection, query});

        clearInterval(this.interval);
    }

    render() {

        

        const latestTime = `${this.state.time}`;
        
        const fiveMinuteStyle = {
            value: {
                normal: { fill: "#378663", opacity: 0.2 },
                highlight: { fill: "619F3A", opacity: 0.5 },
                selected: { fill: "619F3A", opacity: 0.5 }
            }
        };

        const scatterStyle = {
            value: {
                normal: {
                    color: "#999999",
                    opacity: 1,
                    size:100
                }
            }
        };

        const styleActual = styler([
            { key: "value", color: "#999999", width: 3 }
        ]);

        const stylePrediction = styler([
            { key: "value", color: "#378663", width: 3 }
        ]);
        //
        // Create a TimeSeries for our raw, 5min and hourly events
        //

        const eventSeries = new TimeSeries({
            name: "raw",
            events: this.state.events.toArray()
        });

        const actualSeries = new TimeSeries({
            name: "actual",
            events: this.state.actualevents.toArray()
        });

        const perc50Series = new TimeSeries({
            name: "five minute perc50",
            events: this.state.percentile50Out.toArray()
        });

        const perc90Series = new TimeSeries({
            name: "five minute perc90",
            events: this.state.percentile90Out.toArray()
        });


        // Tracker 
        const f = format(",.0f");
        let predValue, actValue;
        if (this.state.tracker) {
            const index = eventSeries.bisect(this.state.tracker);
            const trackerEvent = eventSeries.at(index);
            predValue = `${f(trackerEvent.get("value"))}`;

            // const index = eventSeries.bisect(this.state.tracker);
            const trackerEvent2 = actualSeries.at(index);
            actValue = `${f(trackerEvent2.get("value"))}`;
        }

        // Timerange for the chart axis
        var initialBeginTime = new Date(1900, 0, 1);

        if (eventSeries.range()){
            initialBeginTime = eventSeries.range().begin();
        } 
        const timeWindow = 4379 * hours; // Time window every 6 months

        let beginTime;
        const endTime = new Date(this.state.time.getTime() + minute);
        if (endTime.getTime() - timeWindow < initialBeginTime.getTime()) {
            beginTime = initialBeginTime;
        } else {
            beginTime = new Date(endTime.getTime() - timeWindow);
        }
        const timeRange = new TimeRange(beginTime, endTime);

        // Charts (after a certain amount of time, just show hourly rollup)
        const charts = (
            <Charts>
                {/* <BarChart
                    axis="y"
                    series={perc90Series}
                    style={fiveMinuteStyle}
                    columns={["value"]}
                />
                <BarChart
                    axis="y"
                    series={perc50Series}
                    style={fiveMinuteStyle}
                    columns={["value"]}
                /> */}
                <LineChart 
                    axis="y" 
                    breakLine={true}
                    columns={["value"]} 
                    series={eventSeries} 
                    style={stylePrediction}  
                />
                <LineChart axis="y" 
                    breakLine={true}
                    columns={["value"]} 
                    series={actualSeries} 
                    style={styleActual}
                />

            </Charts>
        );

        const dateStyle = {
            fontSize: 12,
            color: "#AAA",
            borderWidth: 1,
            borderColor: "#F4F4F4"
        };

        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        {/* <Legend
                            type="swatch"
                            style={style}
                            categories={[
                                {
                                    key: "perc50",
                                    label: "50th Percentile",
                                    style: { fill: "#C5DCB7" }
                                },
                                {
                                    key: "perc90",
                                    label: "90th Percentile",
                                    style: { fill: "#DFECD7" }
                                }
                            ]}
                        /> */}
                    </div>
                    <div className="col-md-8">
                        <span style={dateStyle}>{latestTime}</span>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ChartContainer onTrackerChanged={this.handleTrackerChanged} timeRange={timeRange}>
                                <ChartRow height="200">
                                    <YAxis
                                        id="y"
                                        label={this.props.variable}
                                        min={0}
                                        max={this.props.maxValue}
                                        width="70"
                                        type="linear"
                                    />
                                    {charts}
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    </div>
                </div>
                <div className="row-md-12">
                    <div className="col-md-12">
                        <span>
                            <Legend
                                type="line"
                                align="right"
                                style={stylePrediction}
                                highlight={this.state.highlight}
                                onHighlightChange={highlight => this.setState({ highlight })}
                                selection={this.state.selection}
                                onSelectionChange={selection => this.setState({ selection })}
                                categories={[
                                    // { key: "aud", label: "AUD", value: audValue },
                                    { key: "value", label: this.props.variable +' (Prediction)', value: predValue },
                                    // { key: "value", label: this.props.variable +' (Actual)', value: actValue }

                                ]}
                            />
                            <Legend
                                type="line"
                                align="right"
                                style={styleActual}
                                highlight={this.state.highlight}
                                onHighlightChange={highlight => this.setState({ highlight })}
                                selection={this.state.selection}
                                onSelectionChange={selection => this.setState({ selection })}
                                categories={[
                                    // { key: "aud", label: "AUD", value: audValue },
                                    // { key: "value", label: this.props.variable +' (Prediction)', value: predValue },
                                    { key: "value", label: this.props.variable +' (Actual)', value: actValue }

                                ]}
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const selector = createSelector(
    (state) => state.predictions,
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

export default connect(selector, bindActions)(findModel(PredictionChart));

// Export example
// export default PredictionChart;
