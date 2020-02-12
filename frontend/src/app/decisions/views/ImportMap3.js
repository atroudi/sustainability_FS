/* global window, fetch */
import React, {Component, PureComponent} from 'react';
import MapGL, {Marker, Popup, NavigationControl, FullscreenControl} from 'react-map-gl';
import {lineDistance, along, point, bearing} from '@turf/turf';
// import Accident2018_doha from './Accident2018_doha.json';
import CountryList from "./CountryList";
// import Container from "../../components/list/Container";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXRyb3VkaSIsImEiOiJjanRlZDhhMGcwMDRwNGZ0ZmpyaHQ2YjF2In0.9ANhQj-Jfyx7R8F2B71mMw'; // Set your mapbox token here
const POINT_SOURCE_ID = "point-source";
const ROUTE_SOURCE_ID = "route-source"
// const data = Accident2018_doha;

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};


const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  // font:1,
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

let IRN = [-8.17, 53.48]
let NLD = [5.70, 52.01]
let CHN = [116.43, 39.90 ]
let SPN = [-3.76, 40.4]
let USA = [-93.22, 39.44]
let MRC = [-6.40, 32.8]
let FRA = [2.98, 48.68]
let IND = [79.71, 21.41]
let LBN = [35.72, 33.99]
let TUR = [32.67, 39.85]
let PAK = [68.47,29.46]
let AUS = [133.93, -23.52]

const COUNTRIES_DICT = {
  "IRN" : [-8.17, 53.48],
  "NLD" : [5.70, 52.01],
  "CHN" : [116.43, 39.90 ],
  "ESP" : [-3.76, 40.4],
  "USA" : [-93.22, 39.44],
  "MRC" : [-6.40, 32.8],
  "FRA" : [2.98, 48.68],
  "IND" : [79.71, 21.41],
  "LBN" : [35.72, 33.99],
  "TUR" : [32.67, 39.85],
  "PAK" : [68.47,29.46],
  "AUS" : [133.93, -23.52]

}
// Origin
var origins = [];


export default class Map extends React.Component {  
  constructor(props) {
    super(props);
    var current = new Date().getTime();

    this.state = {
        viewport: {
            // width: props.contentWrapperMinWidth,
            // height: props.contentWrapperMinHeight,
            latitude: 59.36,
            longitude: 4.87 ,
            zoom: 2,
            // bearing: 0,
            // pitch: 0
        }
    };

    this._mapRef = React.createRef();
    this._handleMapLoaded = this._handleMapLoaded.bind(this);
  }

  
  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  _onViewportChange = viewport => this.setState({viewport});

  _getMap = () => {
    return this._mapRef.current ? this._mapRef.current.getMap() : null;
  }

  _handleMapLoaded = event => {
    const map = this._getMap();
    // San Francisco
    var origin = [];

    // Washington DC
    var destination = [51.15, 25.2 ];

    // A simple line from origin to destination.
    var route = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    origin,
                    destination
                ]
            }
        }]
    };

    // let IRN = [-8.17, 53.48]
    // let NLD = [5.70, 52.01]
    // let CHN = [116.43, 39.90 ]
    // let SPN = [-3.76, 40.4]
    // let USA = [-93.22, 39.44]
    // let MRC = [-6.40, 32.8]
    // let FRA = [2.98, 48.68]
    // let IND = [79.71, 21.41]
    // let LBN = [35.72, 33.99]
    // let TUR = [32.67, 39.85]

    // // Origin
    // var origins = [IRN, NLD, CHN, SPN, USA, MRC, FRA, IND, LBN, TUR ];
    // Destination
    var destination = [51.15, 25.2 ];

    // A simple line from origin to destination.
    var routes = {
      "type": "FeatureCollection",
      "features": []
  };


    var moving_points = {
      "type": "FeatureCollection",
      "features": [
    ]
  };



    // var data = Accident2014.features;
    // requestJson('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson', (error, response) => {
    //   if (!error) {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...

    map.addSource(POINT_SOURCE_ID, { type: "geojson", data: moving_points});
    map.addSource(ROUTE_SOURCE_ID, { type: "geojson", data: routes});

    map.addLayer({
      "id": "route",
      "source": ROUTE_SOURCE_ID,
      "type": "line",
      "paint": {
          "line-width": 2,
          "line-color": "#06a35c"
      }
    });

    map.addLayer({
      "id": "point",
      "source": POINT_SOURCE_ID,
      "type": "symbol",
      "layout": {
          "visibility": "visible",
          "icon-image": "airport-11",
          "icon-rotate": ["get", "bearing"],
          "icon-rotation-alignment": "map",
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
      },
      "paint": {
        "icon-color": "#06a35c",
        "icon-halo-color": "#06a35c",
        "icon-halo-width": 2
      }
    });

    // this._updateImportCountries(["IRN", "NLD" ,"CHN" ,
    // "ESP" ,
    // "USA" ,
    // "MRC" ,
    // "FRA" ,
    // "IND" ,
    // "LBN" ,
    // "TUR" ])
  }

  
  _setMapData = features => {
    const map = this._getMap();
    map && map.getSource(HEATMAP_SOURCE_ID).setData(this._mkFeatureCollection(features));
  }

  // _onHover = event => {
  //   const {features, srcEvent: {offsetX, offsetY}} = event;
  //   // const hoveredFeature = features && features.find(f => f.layer.id === 'data');
  //   console.log(features)
  //   // this.setState({hoveredFeature, x: offsetX, y: offsetY});
  // };

  _updateImportCountries= (countries) => {
    console.log("Update import countries");
    const map = this._getMap();
    if(map){

      var countries_coord = []
      for (let el in countries){
          countries_coord.push(COUNTRIES_DICT[countries[el]]);
      }
      origins = countries_coord;
      var counter = 0;


      
      
        
      
          // Destination
          var destination = [51.15, 25.2 ];

          // A simple line from origin to destination.
          var routes = {
            "type": "FeatureCollection",
            "features": []
        };
      
          for (i=0;i<origins.length;i++){
            var tmproutefeature = {
                  "type": "Feature",
                  "geometry": {
                      "type": "LineString",
                      "coordinates": [
                          origins[i],
                          destination
                      ]
                  }
              };
            routes.features.push(tmproutefeature)
          }
      
      
          // A single point that animates along the route.
          // Coordinates are initially set to origin.
          var moving_point = {
              "type": "FeatureCollection",
              "features": [{
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                      "type": "Point",
                      "coordinates": origin
                  }
              }]
          };
      
          var moving_points = {
            "type": "FeatureCollection",
            "features": [
          ]
        };
      
        for (i=0;i<origins.length;i++){
          var tmproute_moving_point_feature = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        origins[i],
                        destination
                    ]
                }
            };
            moving_points.features.push(tmproute_moving_point_feature)
        }
      
          // Calculate the distance in kilometers between route start/end point.
          // var line_distance = lineDistance(route.features[0], 'kilometers');
      
          var line_distances = []
          
          for (i=0;i<origins.length;i++){
            var line_distance_tmp = lineDistance(routes.features[i], 'kilometers');
            line_distances.push(line_distance_tmp)
          }
      
          // lineDistance(route.features[0], 'kilometers');
          var arcs = []
      
          // Number of steps to use in the arc and animation, more steps means
          // a smoother arc and animation, but too many steps will result in a
          // low frame rate
          var steps = 1500;
      
          // Draw an arc between the `origin` & `destination` of the two points
          // for (var i = 0; i < line_distance; i += line_distance / steps) {
          //     var segment = along(route.features[0], i, 'kilometers');
          //     arc.push(segment.geometry.coordinates);
          // }
          for (var j=0;j<origins.length;j++){
            var arc = [];
      
            for (var i = 0; i < line_distances[j]; i += line_distances[j] / steps) {
              var segment = along(routes.features[j], i, 'kilometers');
              arc.push(segment.geometry.coordinates);
            }
            arcs.push(arc);
          }
          // Update the route with calculated arc coordinates
          // route.features[0].geometry.coordinates = arc;
          
          for (var j=0;j<origins.length;j++){
      
            routes.features[j].geometry.coordinates = arcs[j];
          }
          // Used to increment the value of the point measurement against the route.
          var counter = 0;
      
          // var data = Accident2014.features;
          // requestJson('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson', (error, response) => {
          //   if (!error) {
              // Note: In a real application you would do a validation of JSON data before doing anything with it,
              // but for demonstration purposes we ingore this part here and just trying to select needed data...
            // map.addSource(POINT_SOURCE_ID, { type: "geojson", data: moving_points});
            // map.addSource(ROUTE_SOURCE_ID, { type: "geojson", data: routes});          
          if (map.getSource(POINT_SOURCE_ID) || map.getSource(ROUTE_SOURCE_ID)){
            map.getSource(POINT_SOURCE_ID).setData(moving_points);
            map.getSource(ROUTE_SOURCE_ID).setData(routes);
          } else {
            // exit
            return;
          }

      function animate() {
        for (var j=0;j<origins.length;j++){

          // Update point geometry to a new position based on counter denoting
          // the index to access the arc.
          moving_points.features[j].geometry.coordinates = routes.features[j].geometry.coordinates[counter];

          // Calculate the bearing to ensure the icon is rotated to match the route arc
          // The bearing is calculate between the current point and the next point, except
          // at the end of the arc use the previous point and the current point
          moving_points.features[j].properties.bearing = bearing(
              point(routes.features[j].geometry.coordinates[counter >= steps ? counter - 1 : counter]),
              point(routes.features[j].geometry.coordinates[counter >= steps ? counter : counter + 1])
          );
        }
        // Update the source with this new data.
        map.getSource(POINT_SOURCE_ID).setData(moving_points);

        // Request the next frame of animation so long the end has not been reached.
        if (counter < steps - 20) {
            requestAnimationFrame(animate);
        }
        // Replay automatically
        else {
            console.log("finished")
          counter = 0
          for (var j=0;j<origins.length;j++){

            // Update point geometry to a new position based on counter denoting
            // the index to access the arc.
            moving_points.features[j].geometry.coordinates = routes.features[j].geometry.coordinates[counter];
    
          }

          // Update the source with this new data.
          map.getSource(POINT_SOURCE_ID).setData(moving_points);
          
          // Start the animation.
          animate(counter);
        }

        counter = counter + 1;
      }

      // Start the animation.
      animate(counter);
        // map.getSource(ROUTE_SOURCE_ID).setData(routes);

      }
  }

  componentWillReceiveProps(nextProps){
    const {props} = this;
    if (props.import_countries !== nextProps.import_countries) {
      this._updateImportCountries(nextProps.import_countries)
    }
    console.log(nextProps.import_countries)
  }

  render() {

    const {viewport, allDay, selectedTime, startTime, endTime} = this.state;
    // const {children} = this.props;
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
          updateImportCountries: this._updateImportCountries,
      });
  });
    return (
        <div>
        <MapGL
            width= "100%"
            height= {this.props.contentWrapperMinHeight}
          ref={this._mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/light-v10"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onLoad={this._handleMapLoaded}
          >
          
          {/* <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div> */}
            {children}
            {/* <List/> */}
          </MapGL>
          
       </div>
      );
  }
}