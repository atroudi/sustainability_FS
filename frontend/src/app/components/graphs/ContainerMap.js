import React from "react";
import {Col, Row} from "react-bootstrap";
import GraphChartJs from "./GlucoseChartJs"
import Map from "./Map3"
// import MapBox from "./MapBox"

// import Map from "./Map2" 
import Box from "../list/Box";

class Container extends React.Component {
    componentWillMount() {
        const {actions, collection} = this.props;
        const query = collection.get("query");
        actions.fetchCollectionIfEmpty({collection, query});
    }

    render() {
        const {children, rowOneWidth = 4, rowTwoWidth = 8} = this.props;
        return (
            // <Row>
                // <Col >
                    <Map {...this.props}
                        // {...children}
                     />
                    
            // </Row>
        );
    }
}

export default Container;
