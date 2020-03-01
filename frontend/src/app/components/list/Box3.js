import React from "react";
import {Box} from "adminlte";
import {Panel} from "react-bootstrap";

import Detail from "../../decisions/views/Detail";
import Pagination from "app/components/Pagination";
import RefreshButton from "app/components/RefreshButton";
import SearchBox from "app/components/SearchBox";


class MasterBox extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          open: false
        };
      }

    render() {
        const {collection, CreateForm, QueryForm} = this.props;
        return (
            <Box.Wrapper 
            >
                <Box.Header >

                    <Box.Title>Details</Box.Title>
                                    <Box.Tools toggle>
                        <button  onClick={() => this.setState({ open: !this.state.open })} className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i className="fa fa-plus"></i></button>
                    </Box.Tools>
                </Box.Header>
                <Panel id="collapsible-panel-example-1" expanded={this.state.open}>
                <Panel.Collapse>
                <Panel.Body>
                    <Box.Body>
                        <Detail {...this.props}/>
                    </Box.Body>
                </Panel.Body>
                </Panel.Collapse>
                </Panel>
            </Box.Wrapper>
        );
    }
}

export default MasterBox;
