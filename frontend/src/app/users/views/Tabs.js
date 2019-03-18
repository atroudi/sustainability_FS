import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import {Tab, Tabs} from "react-bootstrap";
import PropTypes from 'prop-types';
import actions from "app/actions/collection";
import findModel from "app/components/higherOrder/findModel";


class TabGraphsContainer extends React.Component {
    componentWillMount() {
        const {props} = this;
        this.setState({activeKey: props.children.props.route.path});
        console.log(React.version);
    }

    componentWillReceiveProps(nextProps) {
        const {props} = this;
        if (
            (props.params.geolocation !== nextProps.params.geolocation)
            // && (props.children.props.route.path !== nextProps.children.props.route.path)
        ) {
            const {model} = nextProps;
            const {router} = this.context;
            const activeKey = nextProps.children.props.route.path;
            router.push(model.tabUrl(activeKey));
            this.setState({activeKey});
        }
    }

    handleSelect = (activeKey) => {
        const {model} = this.props;
        const {router} = this.context;
        // router.push(model.tabUrl(activeKey));
        // router.push("/admin/"+ this.props.routes[2].path + "/" + this.props.params.geolocation + "/" + activeKey);
        router.push(model.tabUrl2(this.props.routes[2].path, activeKey));

        this.setState({activeKey});
    };

    render() {
        const {children, model} = this.props;
        const {activeKey} = this.state;

        var isfield = this.props.model.is_field;
        
        // Field graphs or stations  
        if (isfield===true)
            return ( 
                <Tabs
                    animation={false}
                    activeKey={activeKey}
                    className="nav-tabs-custom"
                    onSelect={this.handleSelect}
                >
                    <Tab
                        disabled={true}
                        tabClassName="pull-left header"
                        title={model.toString()}
                    />
                    
                    <Tab
                        eventKey="field/prediction"
                        tabClassName="pull-right"
                        title="Predictions"
                    >
                        {activeKey === "field/prediction" && children}
                    </Tab>
                    {/* <Tab
                        eventKey="field/sankey"
                        tabClassName="pull-right"
                        title="Sankey Graph"
                    >
                        {activeKey === "field/sankey" && children}
                    </Tab> */}
                    <Tab
                        eventKey="field/records"
                        tabClassName="pull-right"
                        title="Historical Records"
                    >
                        {activeKey === "field/records" && children}
                    </Tab>
                    <Tab
                        eventKey="field/images"
                        tabClassName="pull-right"
                        title="Images"
                    >
                        {activeKey === "field/images" && children}
                    </Tab>
                </Tabs>
                
            );
        else
            return ( 
                <Tabs
                    animation={false}
                    activeKey={activeKey}
                    className="nav-tabs-custom"
                    onSelect={this.handleSelect}
                >
                    <Tab
                        disabled={true}
                        tabClassName="pull-left header"
                        title={model.toString()}
                    />
                    
                    <Tab
                        eventKey="rtime"
                        tabClassName="pull-right"
                        title="RealTime Graphs"
                    >
                        {activeKey === "rtime" && children}
                    </Tab>
                    <Tab
                        eventKey="records"
                        tabClassName="pull-right"
                        title="Historical Records"
                    >
                        {activeKey === "records" && children}
                    </Tab>
                    {/* <Tab
                        eventKey="images"
                        tabClassName="pull-right"
                        title="Images"
                    >
                        {activeKey === "images" && children}
                    </Tab> */}
                </Tabs>
                
            );
    }
}

TabGraphsContainer.contextTypes = {
    router: PropTypes.object
};

const selector = createSelector(
    (state) => state.geolocations,
    (collection) => {
        return {
            collection
        };
    }
);

const bindActions = (dispatch) => {
    return {actions: bindActionCreators(actions, dispatch)};
};

export default connect(selector, bindActions)(findModel(TabGraphsContainer));
