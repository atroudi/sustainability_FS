
/*
 * GoogleMap hover example
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
// import { GoogleApiWrapper, InfoWindow, Marker } from 'google-map-react';
import {browserHistory} from 'react-router';
import GoogleMap from 'google-map-react';
import MapGL, {Marker, Popup, NavigationControl, FullscreenControl, FlyToInterpolator} from 'react-map-gl';
import {Col, Row} from "react-bootstrap";
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXRyb3VkaSIsImEiOiJjanRlZDhhMGcwMDRwNGZ0ZmpyaHQ2YjF2In0.9ANhQj-Jfyx7R8F2B71mMw'; // Set your mapbox token here
import Background from '../images/farm_logo.png';

const YOUR_GOOGLE_MAP_API_KEY = "AIzaSyAhAjQ4Zz_3C4FPEtTVN9aejPuaQM7FdkE"
const data = Background;

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

const K_SIZE = 40;
const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  backgroundImage:  `url(${Background})`,
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  // border: '5px solid #378663',
  borderRadius: K_SIZE,
  // backgroundColor: 'white',
  textAlign: 'center',
  color: '#378663',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer',
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '5px solid #378663',
  color: '#378663',
  backgroundImage: `url(${Background})`

};

const F_SIZE = 10;


const greatFieldStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: F_SIZE,
  height: F_SIZE,
  left: -F_SIZE / 2,
  top: -F_SIZE / 2,

  // border: '5px solid #ecb349',
  borderRadius: F_SIZE,
  // backgroundColor: 'white',
  textAlign: 'center',
  color: '#378663',
  fontSize: 10,
  fontWeight: 'bold',
  // padding: 0,
  cursor: 'pointer'
};

const greatFieldStyleHover = {
  ...greatFieldStyle,
  border: '5px solid #ecb349',
  color: '#ecb349'
};

class MyGreatPlaceWithControllableHover extends Component {
  static propTypes = {
    // use hover from controllable
    hover: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const className_content = this.props.is_field ? "hint__content field" : "hint__content";
    const className_content_info = this.props.is_field ? "hint hint--html hint--info hint--top field" : "hint hint--html hint--info hint--top";
    const locationId = this.props.is_field ? this.props.locationId-7 : this.props.locationId;
    let img_width=40

    const img = this.props.is_field ? <img  style={{position: 'absolute', left: '-15px'}} src={`${ window.django.urls.staticRoot}adminlte/img/food/farm_logo.png`} width={img_width} height={img_width} alt="Logo" /> : <img style={{position: 'absolute', left: '0px'}} src={`${ window.django.urls.staticRoot}adminlte/img/food/station_logo2.png`} width={img_width} height={img_width} alt="Logo" />

    let style = this.props.hover ? greatPlaceStyleHover : greatPlaceStyle;

    if(this.props.is_field){
      style = this.props.hover ? greatFieldStyleHover : greatFieldStyle;
    }
    const staticRoot = window.django.urls.staticRoot;
    return (
       <div className={className_content_info} style={style} onClick={this.props.onClick}>
          {/* <div>{locationId}</div> */}
          <div style={{width: 80}} className={className_content}>
          {this.props.locationLabel}    
          </div>
          {img}
          {/* <img src={`${ window.django.urls.staticRoot}adminlte/img/food/farm_logo.png`} width={img_width} height={img_width} alt="Logo" /> */}
       </div>
    );
  }
}

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class Map extends Component {
  static propTypes = {
    center: PropTypes.array, // @controllable
    zoom: PropTypes.number, // @controllable
    hoverKey: PropTypes.number, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn

    // greatPlaces: PropTypes.array
  };

  static defaultProps = {
    // center: [59.838043, 30.337157],
    center: [25.315536, 51.434171],

    zoom: 8,
    // greatPlaces: [
    //   // {id: '1', lat: 59.955413, lng: 30.337844},
    //   // {id: '2', lat: 59.724, lng: 30.080},
    //   {id: '1', lat: 25.120826, lng: 51.408685},
    //   {id: '2', lat: 25.320226, lng: 51.208785},
    //   {id: '3', lat: 25.320626, lng: 51.408785}
    // ]
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    console.log(this.props)
    
    if(this.props.params.geolocation){
      console.log(this.props.params.geolocation)
      this.state = {
        isOpen: false,
        viewport: {
          latitude: 25.1,
          longitude: 51.15 + 1.3,
          zoom: 8
        }      
      }
    } else {
      this.state = {
        isOpen: false,
        viewport: {
          latitude: 25.1,
          longitude: 51.15,
          zoom: 8
        }      
      }
    }
  }

  handleToggleOpen = () => {

    this.setState({
      isOpen: true
    });
  }
  
  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  }

  static contextTypes = {
    router: PropTypes.object
  }
  _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
    this.props.onCenterChange(center);
    this.props.onZoomChange(zoom);
  }

  // _onChildClick = (key, model) => {
    
  //   this.props.onCenterChange([this.props.lat, this.props.lng]);
  //   if (this.props.is_field){
  //     this.props.onZoomChange(12);
  //   }
  //   this.setState({
  //     isOpen: true
  //   });

  //   // redirect properly stations and fields
  //   if (this.props.is_field){
  //     this.context.router.replace("/admin/"+ this.props.route.path + "/" + key + "/field/prediction")

  //   }
  //   else {
  //     this.context.router.push("/admin/"+ this.props.route.path + "/" + key + "/rtime")

  //   }
  // }

  click_function(model){
  //   this.setState({viewport: {
  //     latitude: model.lat ,
  //     longitude: model.lng ,
  //     zoom: 8,
  // }})
  this._onViewportChange({
    longitude: model.lng + 1.3,
    latitude: model.lat - 0.5,
    zoom: 8,
    transitionInterpolator: new FlyToInterpolator(),
    transitionDuration: 3000
  });
  // console.log(this.state.viewport.longitude)
    if (model.is_field){
      this._onViewportChange({
        longitude: model.lng + 0.09,
        latitude: model.lat ,
        zoom: 12,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 3000
      });
    }
    this.setState({
      isOpen: true
    });

    // redirect properly stations and fields
    if (model.is_field){
      this.context.router.push("/admin/"+ this.props.route.path + "/" + model.id+ "/field/prediction")
    }
    else {
      this.context.router.push("/admin/"+ this.props.route.path + "/" + model.id + "/rtime")

    }
  }
  _onChildMouseEnter = (key /*, childProps */) => {
    this.props.onHoverKeyChange(key);
  }

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  }

  // _onViewportChange = viewport => this.setState({viewport});

    _onViewportChange = viewport => this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });

    _goToViewport = ({longitude, latitude}) => {
      this._onViewportChange({
        longitude,
        latitude,
        zoom: 11,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 3000
      });
    };

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  render() {
    const {children, collection} = this.props;
    const places = collection.models.toList()
    // Filter map markers
    .filter(model => {
        if (this.props.route.path==="fields")
          return model.is_field;
        else if(this.props.route.path==="stations")
          return !model.is_field;
        else
          // All geolocations case
          return true;
    })
    // Add map markers
    .map((model, key) => {
      var coords = {lat: model.lat, lng: model.lng};
      return (
        <Marker 
        // key={`marker-${index}`}
        longitude={model.lng}
        latitude={model.lat} 
        >
          <MyGreatPlaceWithControllableHover
            key={model.id}
            {...coords}
            locationId={model.id}
            locationLabel={model.label}
            is_field={model.is_field}
            // use your hover state (from store, react-controllables etc...)
            hover={this.props.hoverKey === model.id.toString()}
            onClick={() => this.click_function(model)}
            /></Marker>
        );
    });

    // const places = this.props.greatPlaces
    //   .map(place => {
    //     const {id, ...coords} = place;

    //     return (
    //       <MyGreatPlaceWithControllableHover
    //         key={id}
    //         {...coords}
    //         text={id}
    //         // use your hover state (from store, react-controllables etc...)
    //         hover={this.props.hoverKey === id} />
    //     );
    //   });
    const {viewport} = this.state;
    const { rowOneWidth = 5, rowTwoWidth = 8} = this.props;

    return (
      <div style={{width: '100%', height: '1200px'}}>

        <MapGL
            width= "100%"
            height="100%"
          ref={this._mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          // onLoad={this._handleMapLoaded}
          >

          <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>

          {places}
          <Row  sm={1}></Row>
          <Row  md={6}>
          <Col sm={rowOneWidth}>
          </Col>

                <Col sm={rowTwoWidth} md={7}>
          {children}
          </Col>
          </Row>

          </MapGL>
      </div>
    );
  }
}

//   ReactDOM.render(
//     <div style={{width: '100%', height: '400px'}}>
//       <SimpleMap/>
//     </div>,
//     document.getElementById('main')
//   );
  