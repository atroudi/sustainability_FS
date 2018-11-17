import React from "react";
import ReactDOM from "react-dom";
import { format } from "d3-format";
import {  TimeSeries, TimeRange } from "pondjs";
import _ from "underscore";

import { styler, Charts, ChartContainer, ChartRow, YAxis, LineChart, Baseline, Legend, Resizable } from "react-timeseries-charts";
// import LineChart from "../LineChart";

// import styler from "../../js/styler"
// import Chart from 'chart.js';

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

const style = styler([
    { key: "sgv", color: "#a69ce2", width: 2 }
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

    // currencySeries=new TimeSeries();
    // style;
    // state;
        constructor(props) {
            super(props);

            this.currencySeries = new TimeSeries({
                name: "Currency",
                columns: ["time", "sgv"],
                points:this.buildPoints2(this.props)
            });
            
            
            this.state = {
                initializeRange:false,
                userId: this.props.params.user,
                tracker: null,
                timerange: new TimeRange(0,1),
                x: null,
                y: null,
                maxY: null,
                minY: null
            };

            this.range = new TimeRange(0,1);
      }


    buildPoints2(props) {
        const {collection} = props;
    
        var datelabels = [];
        var count=0
        collection.models.toList().
        sort((a, b) => a.id - b.id).
        map((model, key) => {
            if (model.owner_id==props.params.user){
                var date = new Date(model.sysTime);
                let ms = Date.parse(date);
                datelabels.push(ms);
            }
        });

        var entries = [];
        collection.models.toList()
        .sort((a, b) => a.id - b.id)
        .map(model => {
            if (model.owner_id==props.params.user){
                entries.push(parseInt(model.getSgv()))
            }
        }
        );

        let points = [];
        for (let i = 0; i < entries.length; i++) {
            points.push([datelabels[i], entries[i]]);
        }
        
        return points;

    }



    handleTrackerChanged = tracker => {
        if (!tracker) {
            this.setState({ tracker, x: null, y: null });
        } else {
            this.setState({ tracker });
        }
    };

    handleTimeRangeChange = timerange => {
        this.setState({ timerange });
    };

    handleMouseMove = (x, y) => {
        this.setState({ x, y });
    };

    render() {

        this.currencySeries = new TimeSeries({
            name: "Currency",
            columns: ["time", "sgv"],
            points:this.buildPoints2(this.props)
        });


        if (typeof this.currencySeries.range() === 'undefined'){
            // Data is not initialized
            // Waiting for data to be pulled from DB
        } else if (this.props.params.user != this.state.userId){
            // Update range when userId changes
            this.range = this.currencySeries.range()
            this.setState({timerange:this.range});

            // Update minY and maxY
            this.setState({maxY:this.currencySeries.max("sgv")});
            this.setState({minY:this.currencySeries.min("sgv")});
            
            // Update state.userId with new UserId
            this.setState({userId : this.props.params.user})
        } 
        else{
            this.range = this.currencySeries.range()

            // Initialize when the data are ready
            if (this.state.initializeRange==false){
                this.setState({initializeRange:true});
                this.setState({timerange:this.range});

                // extract minY and maxY
                this.setState({maxY:this.currencySeries.max("sgv")});
                this.setState({minY:this.currencySeries.min("sgv")});
            }


        }

        const f = format("$,.2f");
        const range = this.state.timerange;
        let sgvValue;
        if (this.state.tracker) {
            const index = this.currencySeries.bisect(this.state.tracker);
            const trackerEvent = this.currencySeries.at(index);
            sgvValue = `${f(trackerEvent.get("sgv"))}`;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ChartContainer
                                timeRange={range}
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
                                <ChartRow height="400">
                                    <YAxis
                                        id="y"
                                        label="SGV"
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
                                            breakLine={false}
                                            series={this.currencySeries}
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
                            {/* <Legend
                                type="line"
                                align="right"
                                // style={style}
                                highlight={this.state.highlight}
                                onHighlightChange={highlight => this.setState({ highlight })}
                                selection={this.state.selection}
                                onSelectionChange={selection => this.setState({ selection })}
                                categories={[
                                    // { key: "aud", label: "AUD", value: audValue },
                                    { key: "sgv", label: "SGV", value: sgvValue }
                                ]}
                            /> */}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default GlucoseChartJs2 ;
