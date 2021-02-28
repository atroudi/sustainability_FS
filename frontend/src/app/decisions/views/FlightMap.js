/* global window, fetch */
import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect } from 'react'
// import { Canvas, useFrame } from 'react-three-fiber'
import Globe from 'react-globe.gl'
import {csvParseRows} from 'd3-dsv'
import indexBy from 'index-array-by'
import airports_local from './datasets/airports.json';
import routes_local from './datasets/routes.json';
import countries_polygon_local from './datasets/countries.json';
import countries_polygon_simple_local from './datasets/countries_simple.json';

const COUNTRY = 'United States';
const OPACITY = 0.4;

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment});

const QatarAnimation = [{
  coordinates: [1.3521, 103.8198],
  focusAnimationDuration: 3000,
  focusDistanceRadiusScale: 8,
  focusEasingFunction: ['Linear', 'None'],
},]

class World extends React.Component {
  constructor(props) {
    super(props);

    const byIata = indexBy(this.props.airports, 'iata', false);

    let initialAllRoutes = this.props.routes
    .map(d => Object.assign(d, {
      srcAirport: byIata[d.srcIata],
      dstAirport: byIata[d.dstIata]
    }))

    this.state = {
      airports: this.props.airports,
      routes: initialAllRoutes,
      countries: this.props.import_countries,
      blocked_countries: this.props.blocked_countries,
      blockade_switch: false,
      countries_polygon: countries_polygon_local.features,
      countries_polygon_simple: countries_polygon_simple_local.features,
      hoverArc: null,
      clickPolygon:null,
      animation: QatarAnimation,
    }

    this._mapRef = React.createRef();
    this._updateImportCountries= this._updateImportCountries.bind(this);
    this._updateImportCountries(this.state.countries, this.state.routes, this.state.blocked_countries);

  }


  _getMap = () => {
    return this._mapRef.current ? this._mapRef.current : null;
  }

  _updateImportCountries = (countries, routes, blocked_countries, blockade_switch = this.state.blockade_switch) => {
  
    const byIata = indexBy(this.state.airports, 'iata', false);
    let filteredRoutes = [];
    let filtered_countries_polygon = [];
    let filtered_countries_polygon_simple = [];

    if(countries){
      filteredRoutes = routes
        .filter(d => countries.includes(d.srcIata)) // include countries with import
        .filter(d => ! (blockade_switch && blocked_countries.includes(d.srcIata)))
        .map(d => {
          if((blockade_switch!==this.state.blockade_switch)  && blocked_countries.includes(d.srcIata)){
            return Object.assign(d, {
              __threeObj: null,
              __currentTargetD: null,
              srcAirport: byIata[d.srcIata],
              dstAirport: byIata[d.dstIata]
            });
          }
          if(this.state.countries && this.state.countries.includes(d.srcIata))
            return Object.assign(d, {
              srcAirport: byIata[d.srcIata],
              dstAirport: byIata[d.dstIata]
            });
          else
            // For new object reinitialize threeJS objects attributes
            return Object.assign(d, {
              __threeObj: null,
              __currentTargetD: null,
              srcAirport: byIata[d.srcIata],
              dstAirport: byIata[d.dstIata]
            });
      })

      filtered_countries_polygon = countries_polygon_local.features
        .filter(feature => blockade_switch ? countries.includes(feature.properties.ADM0_A3) || blocked_countries.includes(feature.properties.ADM0_A3) || (feature.properties.ADM0_A3==='QAT')
        : countries.includes(feature.properties.ADM0_A3) || (feature.properties.ADM0_A3==='QAT'));
      filtered_countries_polygon_simple = countries_polygon_simple_local.features
        .filter(feature => blockade_switch ? countries.includes(feature.properties.sov_a3) || blocked_countries.includes(feature.properties.sov_a3) || (feature.properties.sov_a3==='QAT')
        : countries.includes(feature.properties.sov_a3) || (feature.properties.sov_a3==='QAT'));

      console.log(filtered_countries_polygon);
      this.setState({routes:filteredRoutes});
      this.setState({countries: countries});

      // set polygon data
      this.setState({countries_polygon: filtered_countries_polygon});
      this.setState({countries_polygon_simple: filtered_countries_polygon_simple});
    } 
    // else {
    //   filteredRoutes = routes
    //   .map(d => Object.assign(d, {
    //     __threeObj: null,
    //     __currentTargetD: null,
    //     srcAirport: byIata[d.srcIata],
    //     dstAirport: byIata[d.dstIata]
    //   }))
    // }

  }



  _zoomIntoQatar = () => {
    const map = this._getMap();
    map.pointOfView({ lat: 25.31, lng: 51.47, altitude: 0.05}, 2000);
    // .then(
    //   () => {
    //     map.pauseAnimation();
    //   }
    // );
  }

  componentDidMount(){
    const map = this._getMap();
    map.pointOfView({ lat: 25.315, lng: 51.434, altitude: 1.5});
    this._updateImportCountries(this.state.countries, this.state.routes, this.state.blocked_countries)
  }

  componentWillReceiveProps(nextProps){
    const {props} = this;

    if (JSON.stringify(props.import_countries) !== JSON.stringify(nextProps.import_countries)) {
      this._updateImportCountries(nextProps.import_countries, nextProps.routes, this.state.blocked_countries);
    }
    if ( (nextProps.blocked_countries_switch !== this.state.blockade_switch) || (JSON.stringify(this.state.blocked_countries) !== JSON.stringify(nextProps.blocked_countries)) ){
      // if  {
        console.log(nextProps.blocked_countries);
        this.setState({blocked_countries: nextProps.blocked_countries});
        this.setState({blockade_switch: nextProps.blocked_countries_switch});
        this._updateImportCountries(nextProps.import_countries, nextProps.routes, nextProps.blocked_countries, nextProps.blocked_countries_switch);
      // }
    }

    if(nextProps.fieldVizualization!= props.fieldVizualization){
      if(nextProps.fieldVizualization== true){
        this._zoomIntoQatar()
      } else {
        // resume animation if field viz is disabled
        const map = this._getMap();
        map.resumeAnimation();
      }
    }
  }

  render(){
    return  (<Globe
      ref={this._mapRef}
      // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      globeImageUrl="https://raw.githubusercontent.com/hijiangtao/awesome-toolbox/master/assets/EARTH_DIFFUSE_NATURAL_TEXTURE.jpg"
      arcsData={this.state.routes}
      arcLabel={d => `${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`}
      arcStartLat={d => +d.srcAirport.lat}
      arcStartLng={d => +d.srcAirport.lng}
      arcEndLat={d => +d.dstAirport.lat}
      arcEndLng={d => +d.dstAirport.lng}
      arcDashLength={1.0}
      arcDashGap={0.1}
      arcDashInitialGap={() => Math.random()}
      arcDashAnimateTime={1500}
      // arcColor={d => [`rgba(0, 255, 0, ${OPACITY})`, `rgba(255, 0, 0, ${OPACITY})`]}
      arcsTransitionDuration={1000}
      arcStroke={1.0}
      arcColor={d => {
        const op = !this.state.hoverArc ? OPACITY : d === this.state.hoverArc ? 0.9 : OPACITY / 4;
        return [`rgba(0, 255, 0, ${op})`, `rgba(255, 0, 0, ${op})`];
      }}
      onArcHover={arc=>this.setState({hoverArc : arc})}

      polygonsData={this.state.countries_polygon}
      polygonAltitude={d => ["USA","AUS"].includes(d.properties.ADM0_A3) ? 0.04 : (d.properties.ADM0_A3 === "QAT" ? 0 : (d === this.state.clickPolygon ? 0.04 : 0.01))}
      polygonCapColor={d => (this.state.blockade_switch && this.state.blocked_countries.includes(d.properties.ADM0_A3)) ? "#FF5630" : (d === this.state.clickPolygon ? 'rgba(242, 121, 53, 0.8)' : (d.properties.ADM0_A3 === 'QAT'? 'rgba(128, 0, 0, 0.8)' :'rgba(0, 100, 0, 0.5)'))}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => 'rgba(255,255,255,0.7)'}
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        Importation cost: <i>${d.GDP_MD_EST}</i> M$<br/>
        Imported demand: <i>${d.POP_EST}</i>
      `}
      onPolygonClick={polygon=>this.setState({clickPolygon : polygon})}
      polygonsTransitionDuration={3000}
      labelsData={this.state.countries_polygon_simple}
      labelLat={d => d.properties.latitude}
      labelLng={d => d.properties.longitude}
      labelText={d => d.properties.name}
      labelSize={d => 0.4}
      labelDotRadius={d => 0.2}
      labelColor={() => 'white'}
      labelAltitude={d => ["USA","AUS"].includes(d.properties.sov_a3) ? 0.04 : (d.properties.sov_a3 === "QAT" ? 0.01 : (d === this.state.clickPolygon ? 0.06 : 0.01))}
      labelResolution={2}

      animations={QatarAnimation}

    />);

  }
  
};

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: routes_local.routes,
      airports: airports_local.airports
    };

  }


  render() {
    const {viewport, allDay, selectedTime, startTime, endTime, focusOnNewAccidents} = this.state;
    const {children} = this.props;
    
    return (
      <World {...this.props} routes={this.state.routes} airports={this.state.airports}/>
    );
  }
}