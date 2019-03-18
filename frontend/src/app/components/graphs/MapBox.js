import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYXRyb3VkaSIsImEiOiJjanRlM3FtMmMxNmVhNDRxaWJyNGphMm9jIn0.uDac2KqB2VeAk0SKWlhtUQ"
});

// in render()

export default class MapBox extends React.Component{

  render(){

    return(
      <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
      </Map>
      </div>
    )
  }
}



// // tslint:disable-next-line:no-var-requires
// const data = require('./heatmapData.json');
// // tslint:disable-next-line:no-var-requires
// const { token, styles } = require('./config.json');

// const Map = ReactMapboxGl({ accessToken: token });

// const mapStyle = {
//   flex: 1
// };


// const layerPaint = {
//   'heatmap-weight': {
//     property: 'priceIndicator',
//     type: 'exponential',
//     stops: [[0, 0], [5, 2]]
//   },
//   // Increase the heatmap color weight weight by zoom level
//   // heatmap-ntensity is a multiplier on top of heatmap-weight
//   'heatmap-intensity': {
//     stops: [[0, 0], [5, 1.2]]
//   },
//   // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
//   // Begin color ramp at 0-stop with a 0-transparancy color
//   // to create a blur-like effect.
//   'heatmap-color': [
//     'interpolate',
//     ['linear'],
//     ['heatmap-density'],
//     0,
//     'rgba(33,102,172,0)',
//     0.25,
//     'rgb(103,169,207)',
//     0.5,
//     'rgb(209,229,240)',
//     0.8,
//     'rgb(253,219,199)',
//     1,
//     'rgb(239,138,98)',
//     2,
//     'rgb(178,24,43)'
//   ],
//   // Adjust the heatmap radius by zoom level
//   'heatmap-radius': {
//     stops: [[0, 1], [5, 50]]
//   }
// };

// export default class Heatmap extends React.Component {
//   var center = [-0.109970527, 51.52916347] as [number, number];

//   // tslint:disable-next-line:no-any
//   var onStyleLoad = (map: any) => {
//     const { onStyleLoad } = this.props;
//     return onStyleLoad && onStyleLoad(map);
//   };

//   render() {
//     return (
//       <Map
//         style={styles.dark}
//         center={this.center}
//         containerStyle={mapStyle}
//         onStyleLoad={this.onStyleLoad}
//       >
//         <Layer type="heatmap" paint={layerPaint}>
//           {data.map((el: any, index: number) => (
//             <Feature key={index} coordinates={el.latlng} properties={el} />
//           ))}
//         </Layer>
//       </Map>
//     );
//   }
// }