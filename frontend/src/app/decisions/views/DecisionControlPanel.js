import {Box} from "adminlte";
import React, {PureComponent} from 'react';
import {PanelGroup, Panel} from "react-bootstrap";
import RangeControl from "./Utils/RangeControl"
import SwitchControl from "./Utils/SwitchControl"

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
                <label htmlFor="material-switch5">
                    <SwitchControl handleSwitchChange={t => console.log("Flood switch enabled")} />
                    <span style={{paddingTop: '100px'}}> Flood </span>
                </label>
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
                  <span style={{paddingTop: '100px'}}> Visualize </span>
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
