import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import findModel from "app/components/higherOrder/findModel";
import {createSelector} from "reselect";
import React from "react";
import {Box} from "adminlte";
import actions from "app/actions/collection";
import {Col, Row, Panel} from "react-bootstrap";


const sec = 1000;
const minute = 60 * sec;
const hours = 60 * minute;
const rate = 3000;

export default class DecisionResultPanel extends React.Component{

    constructor(props){
        super(props)
        const {actions, collection} =props;
    }

    

    componentWillReceiveProps(nextProps){
        const {props} = this;
        if(props.demand !== nextProps.demand){
            console.log(nextProps.demand);
        
        }
    }

    render(){      
        
    
    
        return(
            <Panel id="collapsible-panel-example-1" style= {{border: 'none', padding: "0", backgroundColor: 'transparent'}} expanded={this.props.openResultPanel}>
            <Panel.Collapse>
            <Panel.Body>
            <Box.Wrapper>
                <Box.Header>
                    <Box.Title>Pandemic Panel</Box.Title>
                </Box.Header>

                <Box.Tools>
                    </Box.Tools>

                <Box.Body>
                
                </Box.Body>
            </Box.Wrapper> 
            </Panel.Body>
          </Panel.Collapse>
            </Panel>
        );
    }
    
}
