import React, { Component } from 'react';
// import logo from '../images/food/f1.jpg';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";

import actions from "app/actions/collection";
import DeleteButton from "app/components/DeleteButton";
import EditForm from "app/users/components/EditForm";
import findModel from "app/components/higherOrder/findModel";

class Container extends React.Component {

    constructor(props) {
        super(props);
        const {actions, collection} = this.props;
        const query = collection.get("query");

        
        actions.fetchCollectionIfEmpty({collection, query});

    }

  render() {
    return (
      <div>
        <text>dsdsdsdds</text>
          {/* <img src={require('../images/food/f1.jpg')} width="100" height="50" /> */}
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


// export default FoodImDisplay;
