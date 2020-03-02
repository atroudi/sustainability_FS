import {Box} from "adminlte";
import React, {PureComponent} from 'react';
import { Range } from 'react-range';
import Switch from "react-switch";
import {PanelGroup, Panel} from "react-bootstrap";

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;



class RangeControl extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      demand: 0,
      temperature: 0,
      values: this.props.values,
    };
  }

  render(){
    return(
      <Range
        step={this.props.step}
        min={this.props.min}
        max={this.props.max}
        values={this.state.values}
        onChange={values => this.setState({ values })}
        onFinalChange = {values => this.props.onChange(this.props.variable, values[0])} 
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '22px',
              width: '22px',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
                style={{
                  position: 'absolute',
                  top: '-30px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                  padding: '3px',
                  borderRadius: '4px',
                  backgroundColor: '#378663'
                }}
              >
                {this.state.values[0]}
              </div>
              <div
                style={{
                  height: '16px',
                  width: '5px',
                  backgroundColor: isDragged ? '#378663' : '#CCC'
                }}
              />
            </div>
        )}
      />
    );
  }
}

class SwitchControl extends React.Component {
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

export default class ControlPanel extends PureComponent {

  constructor(props) {
    super(props);

    let demand = parseInt(this.props.params.demand);
    this.state = {
      demand: 0,
      temperature: 0,
      demands: [demand],
      resultPanelswitch: false
    };
  }

  render() {
    const {time} = this.props;
    
    return (
        <div className="text-center" >
          <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="1">
          <Panel eventKey="1">
              <Box.Wrapper>
                  <Box.Header>
                          <Panel.Title toggle>Decision Input</Panel.Title>
                      </Box.Header>
              <Panel.Body collapsible>
              <Box.Body>
              <div className="text-left" >
                <p>Set parameters for crop decision prediction
                  <br/>
                  from <b>2020-02-19 {time}</b> to <b>2020-02-19 {time}</b>
                </p>
                <hr />
              </div>
              <div className="text-left" >
                <label>Demand</label>
                <br/>
                <RangeControl {...this.props} min={0} max={this.state.demands[0]*3} step={1000} values={this.state.demands} variable="demand" />
              </div>
              <br/>
              <div className="text-left" >
                <label>Temperature</label>
                <br/>
                <RangeControl {...this.props} min={-5} max={5} step={0.1} values={[0]} variable="temperature" />
              </div>
              <hr />
              <div className="text-left" >
                <label htmlFor="material-switch1">
                    <SwitchControl handleSwitchChange={this.props.onSwitchResultPanel} />
                    <span style={{paddingTop: '100px'}}> Result Panel </span>
                    </label>
                    </div>

              </Box.Body>
              </Panel.Body>
              </Box.Wrapper>
          </Panel>

          <Panel eventKey="2">
              <Box.Wrapper>
                  <Box.Header>
                          <Panel.Title toggle>Disaster scenarios</Panel.Title>
                      </Box.Header>
              <Panel.Body collapsible>
              <Box.Body>
              <div className="text-left" >
                <p>Possible scenarios that may affect decsion prediction
                  <br/>
                  from <b>2020-02-19 {time}</b> to <b>2020-02-19 {time}</b>
                </p>
                <hr />
              </div>
      
              <div className="text-left" >
                <label htmlFor="material-switch2">
                  <SwitchControl handleSwitchChange={t => console.log("blockade switch enabled")} />
                  <span style={{paddingTop: '100px'}}> Blockade </span>
                </label>
                <label htmlFor="material-switch3">
                    <SwitchControl handleSwitchChange={t => console.log("Fire switch enabled")} />
                    <span style={{paddingTop: '100px'}}> Fire </span>
                </label>
                {/* <label htmlFor="material-switch">
                    <SwitchControl handleChange={t => console.log("Flood switch enabled")} />
                    <span style={{paddingTop: '100px'}}> Flood </span>
                </label> */}
              </div>

              </Box.Body>
              </Panel.Body>
              </Box.Wrapper>
          </Panel>

          <Panel eventKey="3">
              <Box.Wrapper>
                  <Box.Header>
                          <Panel.Title toggle>Fields Visualization</Panel.Title>
                      </Box.Header>
              <Panel.Body collapsible>
              <Box.Body>
              <div className="text-left" >
                <p>In depth field visualization of local farms
                  <br/>
                  from <b>2020-02-19 {time}</b> to <b>2020-02-19 {time}</b>
                </p>
                <hr />
              </div>
      
              <div className="text-left" >
                <label htmlFor="material-switch4">
                  <SwitchControl handleSwitchChange={t => console.log("blockade switch enabled")} />
                  <span style={{paddingTop: '100px'}}> Blockade </span>
                </label>
              </div>

              </Box.Body>
              </Panel.Body>
              </Box.Wrapper>
          </Panel>
        </PanelGroup>
        </div>
    );
  }
}
