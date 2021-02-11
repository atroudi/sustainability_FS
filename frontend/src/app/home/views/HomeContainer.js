import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import React from "react";
import {Box} from "adminlte";
import actions from "app/actions/collection";
import {Col, Row} from "react-bootstrap";

class Container extends React.Component {

    render(){
        const staticRoot = window.django.urls.staticRoot;
        let img=<img
        style={{padding: 10, alignSelf: 'flex-start'}}
        src={`${staticRoot}adminlte/img/food/home.png`}
        className="pull-middle" alt="food1" width="645" height="275"
        />
        return(
            <div className="home-container">
            <Box.Wrapper>
                <Box.Header>
                    <Box.Title>National Food Security Decision Platform</Box.Title>
                </Box.Header>

                <Box.Tools>
                    </Box.Tools>

                <Box.Body>
                <Row>

                    <Col sm={7}>
                    <div className="home-text">
                    <br/>The State of Qatar is located in a hyperarid region exposed to heat waves and water scarcity, posing a significant challenge for achieving greater food security. The National Food Security Decision Platform (NFSDP) is an integrated system primarily developed with a view to support governance and policy making for the current expansion of the food sector in Qatar. 
                    <br/><br/>The NFSD Platform provides services for information acquisition, visualisation, analytics and actionable insights. It leverages historical weather, crops and economic data, revealing both the spatial and temporal characteristics of the local and international markets. The platform then determines the optimal decision that should be taken in order to satisfy the local food demand. Also it is based on the principles of sustainable resource management, namely:
                    <ul>
                    <li>Cost effectiveness </li>
                    <li>Efficient interlinkages with energy and water resources </li>
                    <li>Risk mitigation and remediation </li>
                    <li>Environmental protection </li>
                    </ul>
                    </div>
                    {/* <br/> In only a short time, HBKU’s College of Science and Engineering is being seen as an institution that is forging a reliable reputation in research, innovation, and sustainability. Last year, it celebrated its academic milestone with the graduation of its first cohort of PhD students. Now, two of its members, Dr. Tareq Al Ansari, Assistant Professor and Dr. Rajesh Govindan a post-doctorate research fellow, have been admitted into Qatar Science and Technology Park’s Accelerator Program – a competitive program that converts inventive ideas into products that address market demands. 
                    <br/><br/> “The main issue we face is the inefficiency and lack of transparency within the supply chain. The inventories are sometimes inefficient, and there is a lot of wastage or sometimes there is a deficit in supply. Given these conditions, we thought it would be a good idea to focus on optimizing the supply chain,” Govindan says.  */}
                    </Col>
                    {/* <Col sm={1}>
                    </Col> */}
                    <Col sm={2}>
                    {img}
                    </Col>
                </Row>
                </Box.Body>
            </Box.Wrapper>  
            </div>              
    
        )
    }
}

const selector = createSelector(
    (state) => state.geolocations,
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