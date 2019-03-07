import React from "react";
import {Box} from "adminlte";

import LinkedListGroup from "app/components/LinkedListGroup";
import Pagination from "app/components/Pagination";
import RefreshButton from "app/components/RefreshButton";
import SearchBox from "app/components/SearchBox";
import Map from "./Map"

class MasterBox extends React.Component {
    render() {
        const {collection, CreateForm, QueryForm} = this.props;

        return (
            <Box.Wrapper>
                <Box.Header>
                    <Box.Title>Geographical Map</Box.Title>
                    {/* <Box.Tools>
                        <SearchBox {...this.props}/>
                    </Box.Tools> */}
                </Box.Header>
                <Box.Body>
                    <Map/>
                    {/* <LinkedListGroup {...this.props}/> */}
                    {/* <div className="text-center">
                        <CreateForm {...this.props}/>
                        <RefreshButton {...this.props}/>
                        <QueryForm {...this.props}/>
                    </div> */}
                    {/* <Pagination {...this.props}/> */}
                </Box.Body>
            </Box.Wrapper>
        );
    }
}

export default MasterBox;
