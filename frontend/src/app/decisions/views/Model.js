import React from "react";
import moment from "moment";


class Model extends React.Component {

    // componentWillMount() {
    //     const {actions, collection} = this.props;
    //     const query = collection.get("query");
    //     actions.fetchCollection({collection, query});
    // }


    render() {
        const {model} = this.props;
        return (
            <dl className="dl-horizontal">
                <dt className="text-muted">Environment Impact</dt>
                <dd>{model.env}</dd>

                <dt className="text-muted">Cost</dt>
                <dd>{Math.trunc(model.cost)}</dd>

                <dt className="text-muted">Crop Inventory</dt>
                <dd>{Math.trunc(model.crop_inventory)}</dd>

                <dt className="text-muted">Prediction month</dt>
                <dd>{model.month}</dd>

                <dt className="text-muted">Estimation period</dt>
                <dd>1 month</dd> 

                {/* <dd>{moment(model.last_login).format("ddd. MMM. Do YYYY, h:mm A")}</dd> */}
            </dl>
        );
    }
}

export default Model;
