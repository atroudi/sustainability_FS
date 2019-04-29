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
            <Box.Wrapper>
                <Box.Header>
                    <Box.Title>Details</Box.Title>
                
                </Box.Header>
                <Box.Body>
                    <Detail {...this.props}/>
                </Box.Body>
            </Box.Wrapper>
        );
    }
}

export default MasterBox;
