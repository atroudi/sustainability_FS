import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";

import actions from "app/actions/collection";
import DeleteButton from "app/components/DeleteButton";
import EditForm from "app/users/components/EditForm";
import findModel from "app/components/higherOrder/findModel";
import Model from "app/users/components/Model";

import GraphChartJs from "app/components/graphs/GlucoseChartJs"
import GraphChartJs2 from "app/components/graphs/GlucoseChartJs2"
import GraphChartJsPhysio from "app/components/graphs/GlucoseChartJsPhysio"

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
        return (
            <div >
                {/* <Model {...this.props}/> */}
                {/* <text>dsdsdsdds</text> */}
                {img}
                {img2}
                {/* <img src={require('app/images/food/photo1.png')}ddsdsdwidth="200" height="150" /> */}
                
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
