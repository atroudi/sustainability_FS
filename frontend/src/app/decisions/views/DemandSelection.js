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
                    bsStyle={changeSet._errors.demand ? "error" : null}
                    hasFeedback
                    help={changeSet._errors.demand}
                    label="Demand"
                    name="demand"
                    type="number"
                    onChange={handleChange}
                    value={changeSet.demand}
                    help={changeSet._errors.demand}
                >
               </Input>   

               <Input
                    bsStyle={changeSet._errors.inventory ? "error" : null}
                    hasFeedback
                    help={changeSet._errors.inventory}
                    label="Inventory (optional)"
                    name="inventory"
                    type="number"
                    onChange={handleChange}
                    value={changeSet.inventory}
                    help={changeSet._errors.inventory}
                >
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