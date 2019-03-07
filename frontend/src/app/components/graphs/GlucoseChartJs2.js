import React from "react";
import ReactDOM from "react-dom";
import { format } from "d3-format";
import {  TimeSeries, TimeRange } from "pondjs";
import _ from "underscore";
import Moment from "moment";
import { styler, Charts, ChartContainer, ChartRow, YAxis, LineChart, Baseline, Legend, Resizable, ScatterChart, EventMarker } from "react-timeseries-charts";
// import LineChart from "../LineChart";

// import styler from "../../js/styler"
// import Chart from 'chart.js';

const NullMarker = props => {
    return <g />;
};


// Add n year(s) to date
function addYear(d, y) {
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year + y, month, day);
    return c;
}

// Data
const aud = require("./usd_vs_aud.json");
const euro = require("./usd_vs_euro.json");
const euroPoints = euro.widget[0].data.reverse();

function buildPoints() {
    const audPoints = aud.widget[0].data.reverse();
    const euroPoints = euro.widget[0].data.reverse();
    let points = [];
    for (let i = 0; i < audPoints.length; i++) {
        points.push([audPoints[i][0], audPoints[i][1], euroPoints[i][1]]);
    }
    return points;
}

function  buildPoints_perf(props) {
    const {collection} = props;
    let points = [];
    var start = Date.now();
     
    // console.log(collection.models.toList())
    collection.models.toList().
    sort((a, b) => a.id - b.id).
    map((model, key) => {
            let date = new Date(model.time);
            let ms = Date.parse(date);
            points.push([ms,
                parseInt(model.getValue(props.variable))]
            )
    });
    var end = Date.now();
    var elapsed = end - start;
    console.log(elapsed);
    return points;

}

const style = styler([
    { key: "sgv", color: "#6b948a", width: 2 }
]);

const styleScatter = styler([
    { key: "sgv", color: "grey", width: 3  }
]);

class CrossHairs extends React.Component {
    render() {
        const { x, y } = this.props;
        // const style = { pointerEvents: "none", stroke: "#ccc" };
        if (!_.isNull(x) && !_.isNull(y)) {
            return (
                <g>
                    {/* <line style={style} x1={0} y1={y} x2={this.props.width} y2={y} /> */}
                    {/* <line style={style} x1={x} y1={0} x2={x} y2={this.props.height} /> */}
                </g>
            );
        } else {
            return <g />;
        }
    }
}

class GlucoseChartJs2 extends React.Component {

    cgmSeries = new TimeSeries();
    pictureSeries = new TimeSeries();
    // style;
    // state;
        constructor(props) {
            super(props);
            
            
            this.state = {
                initializeRange:false,
                geolocation: this.props.params.geolocation,
                tracker: null,

                trackerValue: "-- °C",
                trackerEvent: null,
                markerMode: "flag",

                timerange: new TimeRange(0,1),
                x: null,
                y: null,
                maxY: null,
                minY: null
            };

            this.range = new TimeRange(0,1);
      }

   
    handleTrackerChanged = tracker => {
        if (!tracker) {
            this.setState({ tracker, x: null, y: null });
        } else {  
            this.setState({ tracker });
        }
    };

    // handleTrackerChanged = t => {
    //     if (t) {
    //         const e = this.pictureSeries.atTime(t);
    //         if(e){
    //             const eventTime = new Date(this.pictureSeries.atTime(t));
    //             const eventValue = e.get("picName");
    //             const v = `${eventValue > 0 ? "+" : ""}${eventValue}`;
    //             this.setState({ tracker: eventTime, trackerValue: v, trackerEvent: e });
    //         }
            
    //     } else {
    //         this.setState({ tracker: null, trackerValue: null, trackerEvent: null });
    //     }
    // };

    handleTimeRangeChange = timerange => {
        this.setState({ timerange });
    };

    handleMouseMove = (x, y) => {
        this.setState({ x, y });
    };

    
    renderMarker = () => {
        if (!this.state.tracker) {
            return <NullMarker />;
        }
        if (this.state.markerMode === "flag") {
            return (
                <EventMarker
                    type="flag"
                    axis="y"
                    event={this.state.trackerEvent}
                    column="sgv"
                    info={[{ label: "Picture", value: this.state.trackerValue }]}
                    // infoTimeFormat="%Y"
                    infoWidth={120}
                    markerRadius={2}
                    markerStyle={{ fill: "black" }}
                />
            );
        } else {
            return (
                <EventMarker
                    type="point"
                    axis="y"
                    event={this.state.trackerEvent}
                    column="sgv"
                    markerLabel={this.state.trackerValue}
                    markerLabelAlign="left"
                    markerLabelStyle={{ fill: "#2db3d1", stroke: "white" }}
                    markerRadius={3}
                    markerStyle={{ fill: "#2db3d1" }}
                />
            );
        }
    };


    componentWillMount(){
        this.cgmSeries = new TimeSeries({
            name: "Currency",
            columns: ["time", "sgv"],
            points: buildPoints_perf(this.props)
        });
    }

    componentWillReceiveProps(nextProps){
        this.cgmSeries = new TimeSeries({
            name: "Currency",
            columns: ["time", "sgv"],
            points: buildPoints_perf(nextProps)
        });
    }
    render() {

       
        // this.pictureSeries = new TimeSeries({
        //     name: "Currency",
        //     columns: ["time", "sgv","picName"],
        //     points:this.buildPoints3(this.props)
        // });

        if (typeof this.cgmSeries.range() === 'undefined'){
            // Data is not initialized
            // Waiting for data to be pulled from DB
        } else if (this.props.params.geolocation != this.state.geolocation){
            

            
            // Update range when geolocation changes
            this.range = this.cgmSeries.range()
            this.setState({timerange:this.range});

            // Update minY and maxY
            this.setState({maxY:this.cgmSeries.max("sgv")});
            this.setState({minY:this.cgmSeries.min("sgv")});
            
            // Update state.geolocation with new geolocation
            this.setState({geolocation : this.props.params.geolocation})
        } 
        else{


            
            this.range = this.cgmSeries.range()

            // Initialize when the data are ready
            if (this.state.initializeRange==false){
                this.setState({initializeRange:true});
                this.setState({timerange:this.range});

                // extract minY and maxY
                this.setState({maxY:this.cgmSeries.max("sgv")});
                this.setState({minY:this.cgmSeries.min("sgv")});
            }


        }
        const f = format(",.2f");
        const formatter = format(".4s");
        const range = this.state.timerange;
        let sgvValue;
        if (this.state.tracker) {
            const index = this.cgmSeries.bisect(this.state.tracker);
            const trackerEvent = this.cgmSeries.at(index);
            sgvValue = `${f(trackerEvent.get("sgv"))}`;
        }


        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                    {/* { this.state.tracker ?
                            <div style={{position: 'relative'}}>                
                                <div style={{position: 'absolute', left: this.state.trackerX, top: '220px' }}>
                                    <div >Data In: {formatter(this.state.trackerEventOut.get('out'))}</div>
                                </div>
                            </div>
                        : null } */}
                        <Resizable>
                            <ChartContainer
                                timeRange={range}
                                // timeRange={new TimeRange(this.range.begin(),addYear(this.range.begin(),3))}
                                timeAxisStyle={{
                                    ticks: {
                                        stroke: "#AAA",
                                        opacity: 0.25,
                                        "stroke-dasharray": "1,1"
                                        // Note: this isn't in camel case because this is
                                        // passed into d3's style
                                    },
                                    values: {
                                        fill: "#AAA",
                                        "font-size": 12
                                    }
                                }}
                                showGrid={true}
                                paddingRight={100}
                                maxTime={this.range.end()}
                                // maxTime={addYear(this.range.begin(),3)}
                                minTime={this.range.begin()}
                                timeAxisAngledLabels={true}
                                timeAxisHeight={65}
                                onTrackerChanged={this.handleTrackerChanged}
                                onBackgroundClick={() => this.setState({ selection: null })}
                                enablePanZoom={true}
                                onTimeRangeChanged={this.handleTimeRangeChange}
                                onMouseMove={(x, y) => this.handleMouseMove(x, y)}
                                minDuration={1000 * 60 * 60 * 24 * 30}
                            >
                                <ChartRow height="200">
                                    <YAxis
                                        id="y"
                                        label={this.props.variable}
                                        min={this.state.minY}
                                        max={this.state.maxY}
                                        style={{
                                            ticks: {
                                                stroke: "#AAA",
                                                opacity: 0.25,
                                                "stroke-dasharray": "1,1"
                                                // Note: this isn't in camel case because this is
                                                // passed into d3's style
                                            }
                                        }}
                                        showGrid
                                        hideAxisLine
                                        width="60"
                                        type="linear"
                                        format=",.2f"
                                    />
                                    <Charts>
                                        <LineChart
                                            axis="y"
                                            breakLine={true}
                                            series={this.cgmSeries}
                                            columns={["sgv"]}
                                            style={style}
                                            interpolation="curveBasis"
                                            highlight={this.state.highlight}
                                            onHighlightChange={highlight =>
                                                this.setState({ highlight })
                                            }
                                            selection={this.state.selection}
                                            onSelectionChange={selection =>
                                                this.setState({ selection })
                                            }
                                        />
                                        {/* <ScatterChart
                                            axis="y"
                                            series={this.pictureSeries}
                                            columns={["sgv"]}
                                            style={styleScatter}
                                        /> */}
                                        

                                        {this.renderMarker()}
                                        <CrossHairs x={this.state.x} y={this.state.y} />
                                        {/* <Baseline
                                            axis="y"
                                            value={1.0}
                                            label="USD Baseline"
                                            position="right"
                                        /> */}
                                    </Charts>
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>
                            <Legend
                                type="line"
                                align="right"
                                style={style}
                                highlight={this.state.highlight}
                                onHighlightChange={highlight => this.setState({ highlight })}
                                selection={this.state.selection}
                                onSelectionChange={selection => this.setState({ selection })}
                                categories={[
                                    // { key: "aud", label: "AUD", value: audValue },
                                    { key: "sgv", label: this.props.variable, value: sgvValue }
                                ]}
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default GlucoseChartJs2 ;
