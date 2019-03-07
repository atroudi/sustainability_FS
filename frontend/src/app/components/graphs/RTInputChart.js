import React from "react";
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
const rate = 500;


function buildPoints_perf(props) {
    const {collection} = props;
    let Enry_Date = [];
    var entries = [];
    var dates = [];
    var start = Date.now();
    collection.models.toList().
    sort((a, b) => a.id - b.id).
    map((model, key) => {
            let date = new Date(model.time);
            let ms = Date.parse(date);
            dates.push(ms);
            entries.push(parseInt(model.getValue(props.variable)))
    });
    Enry_Date=[entries,dates];
    var end = Date.now();
    var elapsed = end - start;
    // console.log("RT Build points execution time: " + elapsed);
    return Enry_Date;
}

class PhysioChart extends React.Component {
    static displayName = "AggregatorDemo";
    constructor(props){
        super(props);
        // Get points 
        let points = buildPoints_perf(props);
        this.state = {
            time: new Date(1900, 0, 1),
            events: new Ring(200),
            percentile50Out: new Ring(100),
            percentile90Out: new Ring(100),
            predictionCount: 0,
            entries: points[0], // Contains Y values
            dates: points[1], // Contains time series for X axis
            count: 0, // is count number for the displayed points
            countMax: points[0].length  // Calculates total Y entries  
        };
    }

    getNewEvent = t => {
        const base = Math.sin(t.getTime() / 10000000) * 350 + 500;
        // const event = new TimeEvent(t, parseInt(base + Math.random() * 1000, 10));
        const event = new TimeEvent(t, parseInt(base + Math.random() * 1000, 10));

        return event;
    };

    intialize_events(){
        //
        // Setup our aggregation pipelines
        //
        this.stream = new Stream();

        // pipeline()
        //     .from(this.stream)
        //     .windowBy("10080m") // Every one week window
        //     .emitOn("discard")
        //     .aggregate({
        //         value: { value: percentile(90) }
        //     })
        //     .to(EventOut, event => {
        //         const events = this.state.percentile90Out;
        //         events.push(event);
        //         this.setState({ percentile90Out: events });
        //     });

        // pipeline()
        //     .from(this.stream)
        //     .windowBy("10080m") // Every one week window
        //     .emitOn("discard")
        //     .aggregate({
        //         value: { value: percentile(50) }
        //     })
        //     .to(EventOut, event => {
        //         const events = this.state.percentile50Out;
        //         events.push(event);
        //         this.setState({ percentile50Out: events });
            // });

        //
        // Setup our interval to advance the time and generate raw events
        //
        
        const increment = minute; 
        this.interval = setInterval(() => {
            // const t = new Date(this.state.time.getTime() + increment);
            // const event = this.getNewEvent(t);


            // Case when there's new Y value to display
            if (this.state.count < this.state.countMax)  {
                const t = new Date(this.state.dates[this.state.count]);
                const event = new TimeEvent(t, this.state.entries[this.state.count]);
                // Raw events
                const newEvents = this.state.events;
                newEvents.push(event);
                this.setState({ time: t, events: newEvents });
                // Let our aggregators process the event
                this.stream.addEvent(event);
                // Update entry count
                this.setState({count: this.state.count + 1 })
            } else {
                // Case finished all Y entries it sould wait if new values to be populated
                console.log("FINISHED ALL VALUES")
            }
        }, rate);
    }


    componentWillReceiveProps(nextProps) {
        const {props} = this;
        const {collection} = nextProps;
        let points = buildPoints_perf(nextProps);

        // Reset events
        this.setState({
            entries:points[0],
            dates:points[1],
            time: new Date(1900, 0, 1),
            events: new Ring(200),
            percentile50Out: new Ring(100),
            percentile90Out: new Ring(100),
            predictionCount: 0,
            count: 0,
            countMax: points[0].length
        });
        clearInterval(this.interval);

        this.intialize_events();
    }
 

    componentDidMount() { 

            this.intialize_events();
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const latestTime = `${this.state.time}`;
        // const latestTime_formatted = new Intl.DateTimeFormat('en-US', { 
        //     year: 'numeric', 
        //     month: 'long', 
        //     day: '2-digit' 
        //   }).format(new Date(latestTime))

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
                    fill: "#378663",
                    opacity: 0.5,
                    size:100
                }
            }
        };

        //
        // Create a TimeSeries for our raw, 5min and hourly events
        //

        const eventSeries = new TimeSeries({
            name: "raw",
            events: this.state.events.toArray()
        });

        const perc50Series = new TimeSeries({
            name: "five minute perc50",
            events: this.state.percentile50Out.toArray()
        });

        const perc90Series = new TimeSeries({
            name: "five minute perc90",
            events: this.state.percentile90Out.toArray()
        });

        // Timerange for the chart axis
        var initialBeginTime = new Date(1900, 0, 1);
        const timeWindow = 4379 * hours; // Time window every 6 months

        if (eventSeries.range()){
            initialBeginTime = eventSeries.range().begin() ;
        } 

    
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
                <BarChart
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
                />
                <ScatterChart axis="y" series={eventSeries} style={scatterStyle} />
            </Charts>
        );

        const dateStyle = {
            textAlign: 'center',
            fontSize: 12,
            color: "#AAA",
            borderWidth: 1,
            borderColor: "#F4F4F4",
        };

        const style = styler([
            { key: "perc50", color: "#C5DCB7", width: 1, dashed: true },
            { key: "perc90", color: "#DFECD7", width: 2 }
        ]);

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
                            <ChartContainer timeRange={timeRange}>
                                <ChartRow height="200">
                                    <YAxis
                                        id="y"
                                        label={this.props.variable}
                                        min={0}
                                        max={this.props.maxValue}
                                        width="50"
                                        type="linear"
                                    />
                                    {charts}
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    </div>
                </div>
            </div>
        );
    }
}

// Export example
export default PhysioChart;
