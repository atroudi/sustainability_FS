import React from "react";
import {Input} from "react-bootstrap";

import selection from "app/components/higherOrder/selection";
import hasPermission from "app/components/higherOrder/hasPermission";


class Form extends React.Component {
    render() {
        const {changeSet, handleChange, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Input
                    bsStyle={changeSet._errors.name ? "error" : null}
                    hasFeedback
                    help={changeSet._errors.name}
                    label="Crop"
                    name="name"
                    type="select"
                    onChange={handleChange}
                    value={changeSet.name}
                    help={changeSet._errors.name}
                >
                <option>Choose...</option>
                 <option value="alfalfa">Alfalfa</option>
                 {/* <option value="all">All</option> */}
               </Input>   
                
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