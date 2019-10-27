import React from "react";
import {FormGroup, ControlLabel, FormControl, Input} from "react-bootstrap";

import selection from "app/components/higherOrder/selection";
import hasPermission from "app/components/higherOrder/hasPermission";


class Form extends React.Component {
    render() {
        const {nextUrl, changeSet, handleChange, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
            
            <ControlLabel>Crop</ControlLabel>
                <FormControl
                    bsStyle={changeSet._errors.name ? "error" : null}
                    help={changeSet._errors.name}
                    // label="Crop"
                    name="crop"
                    type="select"
                    onChange={handleChange}
                    value={changeSet.name}
                    help={changeSet._errors.name}
                    nextUrl={nextUrl}
                    componentClass="select" 
                >
                    <option value="select">Choose ...</option>
                    <option value="Alfalfa">Alfalfa</option>
                    <option value="Tomato-lettuce-strawberry">Tomato-lettuce-strawberry</option>
               </FormControl>   

                <button type="submit" className="hidden"/>
            </form>
        );
    }
}

export default hasPermission(selection(Form), "users.add_emailuser");


// import React from "react";

// export default class CropSelection extends React.Component{

//     render() {
//         return(
//             <div>
//             </div>
//         )
//     }

// }