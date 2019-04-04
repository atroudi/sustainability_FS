import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import React from "react";
import {Box} from "adminlte";
import actions from "app/actions/collection";
import {Col, Row} from "react-bootstrap";
import InfoBox from "./InfoBox"
class Container extends React.Component {

    constructor(props) {
        super(props);
        const {actions, collection} = props;
        let query = collection.get("query");
        query = query.set("search", "");
        query = query.set("crop", "alflfa");
        query = query.set("demand", 200);
        actions.fetchCollection({collection, query});
        console.log(this.props);
    }

    render(){        
        return(
            
            <Box.Wrapper
            width = {3}
                border = {true}
                content = 'The body of the box'
                theme = 'box-default'
                title = 'Expandable'
                collapsed = 'true'
                boxTools = {['expand']}
            >
    
                <Box.Header>
                    <Box.Title>More details</Box.Title>
                </Box.Header>

                <Box.Tools>
                    </Box.Tools>

                <Box.Body>
                <Row>

                    {/* <Col sm={6}>
                    <InfoBox text={"Grow"} progress={"100"} logo={"fa fa-bookmark-o"} color={"info-box bg-green"} number="200"/>

                    </Col>
                    <Col sm={6}>
                    <InfoBox text={"Import"} progress={"1"} logo={"fa fa-bookmark-o"} color={"info-box bg-red"} number="0"/>

                    </Col> */}
                    {/* <Col sm={1}>
                    </Col> */}
                </Row>
                </Box.Body>
            </Box.Wrapper>                
    
        )
    }
}

const selector = createSelector(
    (state) => state.crops,
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

export default connect(selector, bindActions)(Container);