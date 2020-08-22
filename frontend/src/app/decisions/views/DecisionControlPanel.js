import {Box} from "adminlte";
import React, {PureComponent} from 'react';
import {PanelGroup, Panel} from "react-bootstrap";
import RangeControl from "./Utils/RangeControl"
import SwitchControl from "./Utils/SwitchControl"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const blockedCountries = [
  {value:'SAU', label:'Kingdom Saudi Arabia'},
  {value:'ARE', label:'United Arab Emirates'},
  {value:'PAK', label:'Pakistan'}
]

const PANDEMY_LIST = [
  {value:'COVID-19', label:'Covid-19'},
  {value:'OTHER', label:'Other'},
]
export default class ControlPanel extends PureComponent {

  constructor(props) {
    super(props);

    let demand = parseInt(this.props.params.demand);
    this.state = {
      demand: 0,
      temperature: 0,
      demands: [demand],
      resultPanelswitch: false,
      blockadeSwitch: false,
      pandemicSwitch: false
    };
  }

  onSwitchBloackade(s){
    this.setState({blockadeSwitch: ! this.state.blockadeSwitch});
    this.props.onSwitchBlockedCountries(s);
  }

  onSwitchPandemic(s){
    this.setState({pandemicSwitch: ! this.state.pandemicSwitch});
    this.props.onSwitchPandemicPanel(s);

  }
  changePandemic(tweet_list){
    this.changeTweets(tweet_list)
  }

  changeBlockCountries(blocked_countries){
    console.log(blocked_countries);
    let blocker_countries_simple = []
    if (blocked_countries)
      blocker_countries_simple= blocked_countries.map(c => c.value);
    this.props.onChangeBlockedCountries(blocker_countries_simple);
  }

  changeTweets(tweet_list){
    console.log(tweet_list)
    let tweet_list_simple = []
    if (tweet_list)
      tweet_list_simple= tweet_list.map(c => c.value);
    this.props.onChangeTweets(tweet_list_simple);
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
                  from <b>2020-02-19 {time}</b> to <b>2020-03-19 {time}</b>
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
                  from <b>2020-02-19 {time}</b> to <b>2020-03-19 {time}</b>
                </p>
                <hr />
              </div>
      
              <div className="text-left" >
                <label htmlFor="material-switch2">
                  <SwitchControl color='red' handleSwitchChange={s => this.onSwitchBloackade(s) } />
                  <span style={{paddingTop: '100px'}}> Blockade </span>
                </label>
                
                {this.state.blockadeSwitch &&
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  // defaultValue={[blockedCountries[1], blockedCountries[2]]}
                  isMulti
                  options={blockedCountries}
                  onChange={c => this.changeBlockCountries(c)}
                  theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#eb9494',
                      primary: '#eb9494',
                    },
                    
                  })}
                  styles={this.state.blockadeSwitch ? {
                    multiValue: (styles, { data }) => {
                      return {
                        ...styles,
                        backgroundColor: "#eb9494",
                        color: 'white',

                      };
                    },
                  }:{}
                }

                />}
                <hr />
                <label htmlFor="material-switch6">
                    <SwitchControl color='red' handleSwitchChange={s => this.onSwitchPandemic(s) } />
                    <span style={{paddingTop: '100px'}}> Pandemic </span>
                </label>

                {this.state.pandemicSwitch &&
                  <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={[PANDEMY_LIST[0]]}
                  isMulti
                  options={PANDEMY_LIST}
                  onChange={c => this.changePandemic(c)}
                  theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#eb9494',
                      primary: '#eb9494',
                    },
                    
                  })}


                  />
                }

                <hr />

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
