import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import findModel from "app/components/higherOrder/findModel";

import actions from "app/actions/collection";
import ContainerImpCountries from "app/components/list/ContainerImpCountries";
import CreateForm from "app/users/components/CreateForm";
import QueryForm from "app/users/components/QueryForm";

const selector = createSelector(
    (state) => state.imports,
    (collection) => {
        return {
            collection,
            // CreateForm
        };
    }
);

const bindActions = (dispatch) => {
    return {actions: bindActionCreators(actions, dispatch)};
};

export default connect(selector, bindActions)(ContainerImpCountries);
