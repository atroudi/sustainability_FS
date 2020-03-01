import React from "react";
import {Box} from "adminlte";
import {Panel} from "react-bootstrap";

import LinkedListGroup from "app/components/LinkedListGroup";
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
            <Box.Wrapper>
                <Box.Header>
                    <Box.Title>{collection.title}</Box.Title>
                    <Box.Tools>
                        <button className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse" onClick={() => this.setState({ open: !this.state.open })}><i className="fa fa-plus"></i></button>
                    </Box.Tools>
                </Box.Header>
                <Panel id="collapsible-panel-example-1" expanded={this.state.open}>
                <Panel.Collapse>
                <Panel.Body>

                <Box.Body>
                    <LinkedListGroup {...this.props}/>
                </Box.Body>

                </Panel.Body>
                </Panel.Collapse>
                </Panel>
            </Box.Wrapper>
        );
    }
}

export default MasterBox;
