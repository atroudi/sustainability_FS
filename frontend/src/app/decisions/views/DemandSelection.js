import React from "react";
import selection from "app/components/higherOrder/selection";
import hasPermission from "app/components/higherOrder/hasPermission";
import {FormGroup, ControlLabel, FormControl} from "react-bootstrap";


class Form extends React.Component {

    _onChangePredictionDay = (evnt) => {
        this.setState({day:evnt.target.value})
    }

    render() {
        const {changeSet, handleChange, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <ControlLabel>Demand (T)</ControlLabel>

                <FormControl
                    bsStyle={changeSet._errors.demand ? "error" : null}
                    help={changeSet._errors.demand}
                    label="Demand"
                    name="demand"
                    type="number"
                    onChange={handleChange}
                    value={changeSet.demand}
                    help={changeSet._errors.demand}
                >
               </FormControl>  
                <br/>
               <ControlLabel>Inventory [Optional]</ControlLabel>
               <FormControl
                    bsStyle={changeSet._errors.inventory ? "error" : null}
                    help={changeSet._errors.inventory}
                    label="Inventory (optional)"
                    name="crop_inventory"
                    type="number"
                    onChange={handleChange}
                    value={changeSet.crop_inventory}
                    help={changeSet._errors.inventory}
                >
               </FormControl>   
               <br/>
               <div className="input">
               <ControlLabel>Select Decision Day</ControlLabel>

                <FormControl 
                    bsStyle={changeSet._errors.time ? "error" : null}
                    help={changeSet._errors.time}
                    type="date"
                    name="time"
                    onChange={handleChange}
                    value={changeSet.time}
                    />
                </div>

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