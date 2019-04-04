
import React from "react";
import ReactDOM from "react-dom";
import { format } from "path";

var LineChart = require("react-chartjs").Line;

var data = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 80, 81, 56, 55, 40]
        }
        ,
		{
			label: "My Second dataset",
			fillColor: "rgba(173,174,214,0.2)",
			strokeColor: "rgba(173,174,214,1)",
			pointColor: "rgba(173,174,214,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(173,174,214,1)",
			data: [28, 48, 40, 19, 86, 27, 90]
		}
	]
};


var chartOptions = {

	layout: {
		padding: {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}
	},
	///Boolean - Whether grid lines are shown across the chart
	scaleShowGridLines : true,

	//String - Colour of the grid lines
	scaleGridLineColor : "rgba(0,0,0,.05)",

	//Number - Width of the grid lines
	scaleGridLineWidth : 1,

	//Boolean - Whether to show horizontal lines (except X axis)
	scaleShowHorizontalLines: true,

	//Boolean - Whether to show vertical lines (except Y axis)
	scaleShowVerticalLines: true,

	//Boolean - Whether the line is curved between points
	bezierCurve : true,

	//Number - Tension of the bezier curve between points
	bezierCurveTension : 0.4,

	//Boolean - Whether to show a dot for each point
	pointDot : false,

	//Number - Radius of each point dot in pixels
	pointDotRadius : 4,

	//Number - Pixel width of point dot stroke
	pointDotStrokeWidth : 1,

	//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	pointHitDetectionRadius : 20,

	//Boolean - Whether to show a stroke for datasets
	datasetStroke : true,

	//Number - Pixel width of dataset stroke
	datasetStrokeWidth : 2,

	//Boolean - Whether to fill the dataset with a colour
	datasetFill : true,
	// scaleOverride : true,
	// scaleSteps : 5,
	// scaleStepWidth : 50,
	// scaleStartValue : 0,
	scales: {
		xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Month'
				}
			}],
		yAxes: [{
				display: true,
				ticks: {
					beginAtZero: true,
					steps: 5,
					stepValue: 5,
					max: 100
				}
			}]
	} 
	// legend: {
	// 	display: true,
	// 	position: 'top',
	// 	labels: {
	// 	  boxWidth: 80,
	// 	  fontColor: 'black'
	// 	}
	//   },
	
	// {% raw %}
	//String - A legend template
	// legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>"
	// {% endraw %}

	//Boolean - Whether to horizontally center the label and point dot inside the grid
	// offsetGridLines : false
};


  

class GraphChartJs extends React.Component{
	
	constructor(props) {
		super(props);
		this.state=({width:1100, height:650})
	  }
	  updateDimensions(){
		let width = this.refs.div.offsetWidth;
		let height= this.refs.div.offsetHeight;
		this.setState({width:width,height:height});
	  }
	  componentWillMount(){
		this.updateDimensions.bind(this);
	  }
	  componentDidMount(){
		 window.addEventListener("resize", this.updateDimensions.bind(this));
	  }
	  
    render(){
		const canStyle = {
			width: this.state.width 
		  };

		const {model,collection} = this.props;


		function formatDate(date) {
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0'+minutes : minutes;
			var strTime = hours + ':' + minutes + ' ' + ampm;
			return date.getMonth()+1 + "/" + date.getDate() +  "/" + date.getYear() + "  " + strTime;
		  }

		var data2 = {
			labels: [],
			datasets: []
		};



		var datelabels = [];
		var count=0
		collection.models.toList().
		sort((a, b) => a.id > b.id).
		map((model, key) => {
			if (count % 10==0){
				var date = new Date(1416787200000);
				var str = formatDate(date);
				// var d = new Date(1245398693390);
				// var formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
				// var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
				// var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
				// var formattedTime = hours + ":" + minutes;

				// formattedDate = formattedDate + " " + formattedTime;
				datelabels.push(str);
			} else{
				datelabels.push("");
			}
			count++;
		});

		// datelabels = collection.models.toList().map(model => model.id);

		// data2.labels = ["January", "February", "March", "April"];
		data2.labels = datelabels;


		var entries = [];
		// entries.push(datelabels.length)
		collection.models.toList()
		.sort((a, b) => a.id > b.id)
		.map(model => 
			entries.push(parseInt(model.getSgv()))
		);
		// var entries2 = [];
		// var entries2 = entries.slice(0, 50);
		data2.datasets.push(
			{
				label: "SGV",
			fillColor: "rgba(173,174,214,0.2)",
			strokeColor: "rgba(173,174,214,1)",
			pointColor: "rgba(173,174,214,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(173,174,214,1)",
			data: entries

			// data: collection.models.toList().map(model => parseInt(model.getId()))
				}
		);
      return(
			  // <div style={{position: 'absolute',left: '0px'}}>
			<div >

				<LineChart data={data2} options={chartOptions} width="1100" height='650' className="flex-view" style={canStyle} />
			</div>
      )
    }
  }

// var MyComponent = React.createClass({
//     render: function() {
//       return <LineChart data={chartData} options={chartOptions} width="80%" height="250"/>
//     }
//   });
export default GraphChartJs;