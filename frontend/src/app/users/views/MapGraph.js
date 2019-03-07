import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";

import actions from "app/actions/collection";
import Container from "app/components/list/Container";
import CreateForm from "app/users/components/CreateForm";
import QueryForm from "app/users/components/QueryForm";

const userSelector = state => state.users
const recordSelector = state => state.records

const userRecordSelector = createSelector(
    userSelector,
    recordSelector,
    (collection,recordCollection) => {
        return {
            collection,
            CreateForm,
            QueryForm,
            recordCollection

        };
    }
);

const bindActions = (dispatch) => {
    return {actions: bindActionCreators(actions, dispatch)};
};

export default connect(userRecordSelector, bindActions)(Container);
