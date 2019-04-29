import React from "react";
import {Link} from "react-router";


class LinkedListGroup extends React.Component {
    render() {
        const {collection} = this.props;
        return (
            <div className="list-group" style={{opacity: collection.isLoading ? 0.5 : 1}}>
                {collection.models.toList()
                .sort((model1,model2) => model1.quantity_import<model2.quantity_import)
                .map((model, key) =>
                <Link
                    activeClassName="active"
                    className="list-group-item"
                    key={key}
                    to={model.appUrl()}
                >
                    {model.toString()}
                    <span className="pull-right">
                        <i className="fa fa-fw fa-angle-right"/>
                    </span>
                </Link>
                )}
                {collection.models.size === 0
                    && <div style={{opacity: 0.5}} className="list-group-item"> Empty </div>}
            </div>
        );
    }
}

export default LinkedListGroup;
