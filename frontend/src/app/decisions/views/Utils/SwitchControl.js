import React from 'react';
import Switch from "react-switch";

const colorOptions = [
  {value:'green', color:'#bdebd6'},
  {value:'red', color:'#eb9494'}
]

const colorHandleOptions = [
  {value:'green', color:'#378663'},
  {value:'red', color:'#FF5630'}
]
export default class SwitchControl extends React.Component {
    constructor(props){
      super();
      this.state = {
        checked: false
      }
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(checked) {
      this.props.handleSwitchChange(checked);
      this.setState({ checked });
    }
  
    render(){
      return(
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor={this.props.color ? colorOptions[1].color : "#bdebd6"}
          onHandleColor= {this.props.color ? colorHandleOptions[1].color : "#378663"}
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
  