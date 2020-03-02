/* global window, fetch */
import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect } from 'react'
// import { Canvas, useFrame } from 'react-three-fiber'
import Globe from 'react-globe.gl'
import {csvParseRows} from 'd3-dsv'
import indexBy from 'index-array-by'
// import airports from './airports.txt';

const COUNTRY = 'United States';
const OPACITY = 0.4;

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment});

const airports_local = [{
  airportId: "1",
  alt: "13",
  city: "Doha",
  country: "Qatar",
  dst: "N",
  iata: "DOH",
  icao: "OTHH",
  lat: "25.273056",
  lng: "51.608056",
  name: "Hamad International Airport",
  source: "OurAirports",
  timezone: "3",
  type: "airport",
  tz: "\\N",
},
{
  airportId: "2",
  alt: "20",
  city: "Madrid",
  country: "Spain",
  dst: "U",
  iata: "ESP",
  icao: "AYMD",
  lat: "40.4",
  lng: "-3.76",
  name: "Madang Airport",
  source: "OurAirports",
  timezone: "10",
  type: "airport",
  tz: "Pacific/Port_Moresby",
},
{
  airportId: "3",
  alt: "3627",
  city: "Teheran",
  country: "Iran",
  dst: "U",
  iata: "IRN",
  icao: "OIII",
  lat: "35.68920135498047",
  lng: "51.31340026855469",
  name: "Ghale Morghi Airport",
  source: "OurAirports",
  timezone: "10",
  type: "airport",
  tz: "Pacific/Port_Moresby",
},
{
  airportId: "4",
  alt: "3627",
  city: "Melbourne",
  country: "Australia",
  dst: "O",
  iata: "AUS",
  icao: "YMML",
  lat: "-37.673302",
  lng: "144.843002",
  name: "Melbourne International Airport",
  source: "OurAirports",
  timezone: "10",
  type: "airport",
  tz: "Pacific/Port_Moresby",
},
{
  airportId: "5",
  alt: "3627",
  city: "Miami",
  country: "United States",
  dst: "O",
  iata: "USA",
  icao: "KMIA",
  lat: "25.79319953918457",
  lng: "-80.29060363769531",
  name: "Miami International Airport",
  source: "OurAirports",
  timezone: "10",
  type: "airport",
  tz: "Pacific/Port_Moresby",
},
{
  airportId: "6",
  alt: "3627",
  city: "Islamabad",
  country: "Pakistan",
  dst: "O",
  iata: "PAK",
  icao: "OPIS",
  lat: "33.560713",
  lng: "72.851613",
  name: "New Islamabad International Airport",
  source: "OurAirports",
  timezone: "10",
  type: "airport",
  tz: "Pacific/Port_Moresby",
},
];


const routes_local = [
  {
    airline: "4E",
    airlineId: "\N",
    codeshare: "",
    dstAirportId: "2",
    dstIata: "ESP",
    equipment: "PAG",
    srcAirportId: "1",
    srcIata: "DOH",
    stops: "0",
  },
  {
    airline: "4E",
    airlineId: "\N",
    codeshare: "",
    dstAirportId: "1",
    dstIata: "DOH",
    equipment: "PAG",
    srcAirportId: "2",
    srcIata: "ESP",
    stops: "0",
  },

  {
    airline: "4E",
    airlineId: "\N",
    codeshare: "",
    dstAirportId: "3",
    dstIata: "IRN",
    equipment: "PAG",
    srcAirportId: "1",
    srcIata: "DOH",
    stops: "0",
  },
  {
    airline: "4E",
    airlineId: "\N",
    codeshare: "",
    dstAirportId: "1",
    dstIata: "DOH",
    equipment: "IRN",
    srcAirportId: "3",
    srcIata: "IRN",
    stops: "0",
  },

  {
    airline: "4E",
    airlineId: "\N",
    codeshare: "",
    dstAirportId: "4",
    dstIata: "AUS",
    equipment: "PAG",
    srcAirportId: "1",
    srcIata: "DOH",
    stops: "0",
  },
  {
    airline: "4E",
    airlineId: "\N",
    codeshare: "",
    dstAirportId: "1",
    dstIata: "DOH",
    equipment: "PAG",
    srcAirportId: "4",
    srcIata: "AUS",
    stops: "0",
  },

  {
    airline: "4E",
    airlineId: "\N",
    codeshare: "",
    dstAirportId: "5",
    dstIata: "USA",
    equipment: "PAG",
    srcAirportId: "1",
    srcIata: "DOH",
    stops: "0",
  },
  {
    airline: "4E",
    airlineId: "\N",
    codeshare: "",
    dstAirportId: "1",
    dstIata: "DOH",
    equipment: "PAG",
    srcAirportId: "5",
    srcIata: "USA",
    stops: "0",
  },

  {
    airline: "4E",
    airlineId: "\N",
    codeshare: "",
    dstAirportId: "6",
    dstIata: "PAK",
    equipment: "PAG",
    srcAirportId: "1",
    srcIata: "DOH",
    stops: "0",
  },
  {
    airline: "4E",
    airlineId: "\N",
    codeshare: "",
    dstAirportId: "1",
    dstIata: "DOH",
    equipment: "PAG",
    srcAirportId: "6",
    srcIata: "PAK",
    stops: "0",
  },
]

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
      hoverArc: null
    }

    this._mapRef = React.createRef();
    this._updateImportCountries= this._updateImportCountries.bind(this);

    this._updateImportCountries(this.state.countries, this.state.routes)

  }


  _getMap = () => {
    return this._mapRef.current ? this._mapRef.current : null;
  }

  _updateImportCountries = (countries, routes) => {
  
    const byIata = indexBy(this.state.airports, 'iata', false);

    var filteredRoutes = []
    // load data
    if(countries){
      filteredRoutes = routes
      .filter(d => countries.includes(d.srcIata)) // exclude unknown airports
      .map(d => Object.assign(d, {
        srcAirport: byIata[d.srcIata],
        dstAirport: byIata[d.dstIata]
      }))

      // TODO: if new filteredRoutes are more than previous we have to make refresh 
      // console.log(filteredRoutes);
      // console.log(filteredRoutes.length);
      // console.log(this.state.routes.length);

    } else {
      filteredRoutes = routes
      .map(d => Object.assign(d, {
        srcAirport: byIata[d.srcIata],
        dstAirport: byIata[d.dstIata]
      }))
    }

    this.setState({routes:filteredRoutes});

  }


  componentDidMount(){
    const map = this._getMap();
    map.pointOfView({ lat: 25.31, lng: 51.47, altitude: 1.5 });
    this._updateImportCountries(this.state.countries, this.state.routes)
  }

  componentWillReceiveProps(nextProps){
    const {props} = this;

    if (JSON.stringify(props.import_countries) !== JSON.stringify(nextProps.import_countries)) {
      // console.log(props.import_countries);
      // console.log(nextProps.import_countries);
      this._updateImportCountries(nextProps.import_countries, nextProps.routes);
      // console.log(this.state.routes);
    }
  }

  render(){
    // console.log("render");
    // console.log(this.state.routes);

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
      // arcDashInitialGap={() => Math.random()}
      arcDashAnimateTime={1500}
      // arcColor={d => [`rgba(0, 255, 0, ${OPACITY})`, `rgba(255, 0, 0, ${OPACITY})`]}
      arcsTransitionDuration={1000}
      arcStroke={0.3}
      arcColor={d => {
        const op = !this.state.hoverArc ? OPACITY : d === this.state.hoverArc ? 0.9 : OPACITY / 4;
        return [`rgba(0, 255, 0, ${op})`, `rgba(255, 0, 0, ${op})`];
      }}
      onArcHover={arc=>this.setState({hoverArc : arc})}

      pointsData={this.state.airports}
      pointColor={() => 'orange'}
      pointAltitude={0}
      pointRadius={0.2}
      pointsMerge={true}
    />);

  }
  
};

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: routes_local,
      airports: airports_local
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