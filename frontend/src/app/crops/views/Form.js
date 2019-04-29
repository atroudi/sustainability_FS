import React from "react";
import {Input} from "react-bootstrap";

import selection from "app/components/higherOrder/selection";
import hasPermission from "app/components/higherOrder/hasPermission";


export default class Form extends React.Component {
    render() {
        const {nextUrl, changeSet, handleChange, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Input
                    bsStyle={changeSet._errors.name ? "error" : null}
                    help={changeSet._errors.name}
                    label="Crop"
                    name="name"
                    type="select"
                    onChange={handleChange}
                    value={changeSet.name}
                    help={changeSet._errors.name}
                    nextUrl={nextUrl}
                >
                <option>Choose...</option>
                 <option value="alfalfa">Alfalfa</option>
               </Input>   

                <button type="submit" className="hidden"/>
            </form>
        );
    }
}