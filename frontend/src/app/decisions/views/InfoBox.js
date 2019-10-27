import React from "react";
import {Col, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import actions from "app/actions/collection";

class InfoBox extends React.Component{

    // componentWillMount() {
    //     const {actions, collection} = this.props;
    //     const query = collection.get("query");
    //     actions.fetchCollection({collection, query});
    // }
    
    render(){
        const {progress, text, number, color, logo, collection} = this.props;
        const {rowOneWidth} = 2;
        const showprogress = progress==="0";

        return(
            // <Col sm={rowOneWidth}>
                <div className={color}>
                <span className="info-box-icon"><i className={logo}></i></span>
                <div className="info-box-content">
                    <span className="info-box-number">{text}</span>
                    <span className="info-box-text">{this.props.val}</span>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    {showprogress ? (
                        <div/>
                    ) : (
                        <span className="progress-description">
                    {/* {progress}% Increase in 30 Days */}
                    </span>
                    )}
                    
                </div>
                </div>
            // </Col>
        )
    }
}

// const selector = createSelector(
//     (state) => state.decisions,
//     (collection) => {
//         return {
//             collection,
//             // CreateForm
//         };
//     }
// );

// const bindActions = (dispatch) => {
//     return {actions: bindActionCreators(actions, dispatch)};
// };

// export default connect(selector, bindActions)(InfoBox);

export default InfoBox;