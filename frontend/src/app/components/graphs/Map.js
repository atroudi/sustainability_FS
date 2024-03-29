// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => (
//     <div style={{
//       color: 'white', 
//       background: 'grey',
//       padding: '15px 10px',
//       display: 'inline-flex',
//       textAlign: 'center',
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderRadius: '100%',
//       transform: 'translate(-50%, -50%)'
//     }}>
//       {text}
//     </div>
//   );
  
//   class SimpleMap extends React.Component {
//     static defaultProps = {
//       center: {lat: 59.95, lng: 30.33},
//       zoom: 11
//     };
  
//     render() {
//       return (
//         <div style={{width: '100%', height: '400px'}}>
 
//          <GoogleMapReact
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent 
//             lat={59.955413} 
//             lng={30.337844} 
//             text={'Water level: 50'} 
//           />
//         </GoogleMapReact>
//         </div>
//       );
//     }
//   }
// export default SimpleMap;

  
/*
 * GoogleMap hover example
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-map-react';
import {browserHistory} from 'react-router';
import GoogleMap from 'google-map-react';


const YOUR_GOOGLE_MAP_API_KEY = "AIzaSyAhAjQ4Zz_3C4FPEtTVN9aejPuaQM7FdkE"

const K_SIZE = 40;
const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid #378663',
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#000000',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '5px solid #378663',
  color: '#378663'
};

const F_SIZE = 30;


const greatFieldStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: F_SIZE,
  height: F_SIZE,
  left: -F_SIZE / 2,
  top: -F_SIZE / 2,

  border: '5px solid #ecb349',
  borderRadius: F_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#000000',
  fontSize: 10,
  fontWeight: 'bold',
  padding: 4,
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

    let style = this.props.hover ? greatPlaceStyleHover : greatPlaceStyle;

    if(this.props.is_field){
      style = this.props.hover ? greatFieldStyleHover : greatFieldStyle;
    }

    return (
       <div className={className_content_info} style={style}>
          <div>{locationId}</div>
          <div style={{width: 80}} className={className_content}>
          {this.props.locationLabel}    
          </div>
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
    this.state = {
      isOpen: false
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

  _onChildClick = (key, childProps) => {
    this.props.onCenterChange([childProps.lat, childProps.lng]);
    if (childProps.is_field){
      this.props.onZoomChange(12);
    }
    this.setState({
      isOpen: true
    });
    // redirect properly stations and fields
    if (childProps.is_field){
      this.context.router.replace("/admin/"+ this.props.route.path + "/" + key + "/field/prediction")

    }
    else {
      this.context.router.push("/admin/"+ this.props.route.path + "/" + key + "/rtime")
    }
  }

  _onChildMouseEnter = (key /*, childProps */) => {
    this.props.onHoverKeyChange(key);
  }

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  }


  render() {
    const {collection} = this.props;
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
          <MyGreatPlaceWithControllableHover
            key={model.id}
            {...coords}
            locationId={model.id}
            locationLabel={model.label}
            is_field={model.is_field}
            // use your hover state (from store, react-controllables etc...)
            hover={this.props.hoverKey === model.id.toString()}
            />
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

    return (
      <div style={{width: '100%', height: '800px'}}>

        <GoogleMap
          apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
          mapTypeId='SATELLITE'
          center={this.props.center}
          zoom={this.props.zoom}
          hoverDistance={K_SIZE / 2}
          onBoundsChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          >
          {places}
        </GoogleMap>
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
  