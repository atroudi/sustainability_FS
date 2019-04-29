import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";

import actions from "app/actions/collection";
import Container from "app/components/list/ContainerDetails";
import CreateForm from "app/users/components/CreateForm";
import QueryForm from "app/users/components/QueryForm";

const geolocationSelector = state => state.decisions
const recordSelector = state => state.decisions

const userRecordSelector = createSelector(
    geolocationSelector,
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
