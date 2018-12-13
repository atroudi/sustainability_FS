import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import {Col, Row} from "react-bootstrap";

import actions from "app/actions/collection";
import DeleteButton from "app/components/DeleteButton";
import EditForm from "app/users/components/EditForm";
import findModel from "app/components/higherOrder/findModel";
import Model from "app/users/components/Model";

import GraphChartJs from "app/components/graphs/GlucoseChartJs"
import GraphChartJs2 from "app/components/graphs/GlucoseChartJs2"
import GraphChartJsPhysio from "app/components/graphs/GlucoseChartJsPhysio"



import {Image} from 'react-bootstrap';


class Container extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {email: new Date()};
    //   }

    constructor(props) {
        super(props);
        const {actions, collection} = this.props;
        const query = collection.get("query");

        
        actions.fetchCollectionIfEmpty({collection, query});

    }
    
    render() {
        const staticRoot = window.django.urls.staticRoot;
        let img=<img
        style={{padding: 10, alignSelf: 'flex-start'}}
        src={`${staticRoot}adminlte/img/food/f1.png`}
        className="pull-middle" alt="food1" width="275" height="183"
        />
        let img2=<img 
        style={{padding: 10, alignSelf: 'flex-start'}}
        src={`${staticRoot}adminlte/img/food/f2.png`}
        className="pull-middle" alt="food2" width="275" height="183" 
        />
        console.log(this.props.params.user)

        var background = {backgroundSize : 'cover'};
        var textStyle = {
          position: 'absolute', 
          fontSize:24,
          fontWeight:"bold",
          color:"white",
          top: '70%', 
          left: '9%'
        };

        var textStyle2 = {
            position: 'absolute', 
            fontSize:14,
            // fontWeight:"bold",
            color:"white",
            top: '0%', 
            left: '65%'
          };

        return (
            <div >
                {/* <Model {...this.props}/> */}
                {/* <text>dsdsdsdds</text> */}
                <Row>

                <Col sm={3}>
                <h1 style={textStyle}>F1</h1>
                <h1 style={textStyle2}>05/27/18</h1>

                    {img}
                    {/* <text style={{ position: 'relative', left: '5%', top: '50%'}}> Img1 </text> */}

                </Col>
                
                    <Col sm={3}>
                    <h1 style={textStyle}>F2</h1>
                    <h1 style={textStyle2}>05/27/18</h1>
                    {img2}
                    {/* <text style={{ position: 'relative', left: '5%', top: '50%'}}> Img2 </text> */}

                    </Col>
                    
                </Row>


                {/* <img src={require('app/images/food/photo1.png')}ddsdsdwidth="200" height="150" /> */}
                <Row>
                <Col sm={3}>

                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <div className="input-group" >
                        <div className="custom-file">
                            <input  
                                type="file" 
                                className="custom-file-input"
                                onChange={(e)=>this._handleImageChange(e)} />
                        </div>
                        <button 
                            type="submit" 
                            className="input-group-append"
                            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                    </div>
                </form>
                </Col>

                </Row>

            </div>
        );
    }
}

const selector = createSelector(
    (state) => state.records,
    (collection) => {
        return {
            collection,
            // CreateForm,
            // QueryForm
        };
    }
);

const bindActions = (dispatch) => {
    return {actions: bindActionCreators(actions, dispatch)};
};

export default connect(selector, bindActions)(findModel(Container));
