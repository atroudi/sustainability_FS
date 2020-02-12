import React from "react";
import {Col, Row} from "react-bootstrap";
import GraphChartJs from "../../components/graphs/GlucoseChartJs"

import Box from "../../components/list/Box3";

class Container extends React.Component {
    componentDidMount() {
        const {actions, collection} = this.props;
        const query = collection.get("query");
        actions.fetchCollection({collection, query});
    }

    render() {
        const {children, rowOneWidth = 3, rowTwoWidth = 8, collection} = this.props;
        return (
            <div className="grow-detail-panel">
                <Box {...this.props}/>
            </div>
        );
    }
}

export default Container;
