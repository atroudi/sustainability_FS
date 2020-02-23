import React from "react";
import {Box} from "adminlte";

import Detail from "../../decisions/views/Detail";
import Pagination from "app/components/Pagination";
import RefreshButton from "app/components/RefreshButton";
import SearchBox from "app/components/SearchBox";


class MasterBox extends React.Component {
    render() {
        const {collection, CreateForm, QueryForm} = this.props;
        return (
            <Box.Wrapper boxTools ={'collapse'}>
                <Box.Header >

                    <Box.Title>Details</Box.Title>
                                    <Box.Tools>
                        <button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fa fa-minus"></i></button>
                    </Box.Tools>
                </Box.Header>
                <Box.Body>
                    <Detail {...this.props}/>
                </Box.Body>
            </Box.Wrapper>
        );
    }
}

export default MasterBox;
