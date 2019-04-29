import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import findModel from "app/components/higherOrder/findModel";
import {createSelector} from "reselect";
import React from "react";
import {Box} from "adminlte";
import actions from "app/actions/collection";
import {Col, Row} from "react-bootstrap";
import InfoBox from "./InfoBox"
import CollapseBox from "./collapseBox"
import ImportMap from "./ImportMap"
import List2 from "./List2"
import ContainerDetails from "app/components/list/ContainerDetails";

class Container extends React.Component {

    constructor(props){
        super(props)
        const {actions, collection} =props;
        let query = collection.get("query");
        query = query.set("search", "");
        query = query.set("crop", this.props.params.crop);
        query = query.set("demand", this.props.params.demand);
        actions.fetchCollection({collection, query});
    }

    componentDidMount(){
        const {actions, collection} = this.props;
        let query = collection.get("query");
        query = query.set("search", "");
        actions.fetchCollection({collection, query});
    }

    // componentWillReceiveProps(nextProps){

    //     const decision = nextProps.collection.models
    //     .reduce(model => model.month==1)
    //     if (decision){
    //         console.log(decision.tmp_import)
    //     }
    // }

    render(){      
        // TODO: has to be changed as input
        const month = 1
        let import_val = 0 
        let grow_val = 0
        let grow_purcentage = 0  
        let import_purcentage = 0 
        console.log(this.props)
        var decision = this.props.collection.models
        .reduce(model => model.month==1)
        if (decision){
            grow_val = Math.trunc(decision.tmp_grow)
            import_val = Math.trunc(decision.toString())
            if((grow_val !=0 ) & (import_val !=0)){
                grow_purcentage = Math.trunc(grow_val/(grow_val + import_val))* 100
                import_purcentage = Math.trunc(grow_val/(grow_val + import_val))* 100
            }
        } else{
            decision = this.props.model
        }

        return(
            <div className="text-center">

            <Box.Wrapper>
                <Box.Header>
                    <Box.Title>Decision</Box.Title>
                </Box.Header>

                <Box.Tools>
                    </Box.Tools>

                <Box.Body>
                <Row>

                    <Col sm={3}>
                    <InfoBox {...this.props} text={"Grow"} progress={"100"} logo={"fa fa-bookmark-o"} color={"info-box bg-green"} val={grow_val} collection={this.props.collection} />
                    {/* <CollapseBox/> */}
                    {/* <ContainerDetails {...this.props} model={decision} /> */}
                    </Col>
                    <Col sm={9}>
                    <InfoBox {...this.props} text={"Import"} progress={"1"} logo={"fa fa-bookmark-o"} color={"info-box bg-blue"} val={import_val} />
                    <div className="text-left">

                    {/* <ImportMap/> */}
                    </div>
                    </Col>
                    {/* <Col sm={1}>
                    </Col> */}

                </Row>
                <Row>
                <Col sm={3}>
                    {/* <CollapseBox/> */}
                    <ContainerDetails {...this.props} model={decision} />
                    </Col>
                    <Col sm={9}>
                    <div className="text-left">

                    <ImportMap
                    />
                </div>
                </Col>

                </Row>
                </Box.Body>
            </Box.Wrapper>                
            </div>

        )
    }
}

const selector = createSelector(
    (state) => state.decisions,
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

export default connect(selector, bindActions)(findModel(Container));