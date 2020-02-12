import React from "react";
import {connect} from "react-redux";
import ImportMap3 from "../app/decisions/views/ImportMap3"
import {contentWrapperMinHeight} from "./selectors";
import {Row} from "react-bootstrap"

class ContentWrapper extends React.Component {
    render() {
        const {children, contentWrapperMinHeight} = this.props;
        return (
            <Row>
            <div
                style={{"minHeight": contentWrapperMinHeight, "minWidth": 0}}
                className="content-wrapper"
            >
            {/* <ImportMap3> */}
            {children}
            {/* </ImportMap3> */}
            </div>
            </Row>
        );
    }
}

export default connect(contentWrapperMinHeight)(ContentWrapper);
