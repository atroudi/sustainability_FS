import React from "react";
import {Col, Row} from "react-bootstrap";


class InfoBox extends React.Component{

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
                    <span className="info-box-text">{number}</span>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    {showprogress ? (
                        <div/>
                    ) : (
                        <span className="progress-description">
                    {progress}% Increase in 30 Days
                    </span>
                    )}
                    
                </div>
                </div>
            // </Col>
        )
    }
}

export default InfoBox;