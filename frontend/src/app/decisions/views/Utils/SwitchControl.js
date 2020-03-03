import React from 'react';
import Switch from "react-switch";

export default class SwitchControl extends React.Component {
    constructor(props){
      super();
      this.state = {
        checked: false
      }
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(checked) {
      this.props.handleSwitchChange();
      this.setState({ checked });
    }
  
    render(){
      return(
        <Switch
                        checked={this.state.checked}
                        onChange={this.handleChange}
                        onColor="#bdebd6"
                        onHandleColor="#378663"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={10}
                        width={32}
                        className="react-switch"
                        id="material-switch"
                      />
      );
    }
  }
  