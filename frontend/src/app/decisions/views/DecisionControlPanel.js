import {Box} from "adminlte";
import React, {PureComponent} from 'react';
import { Range } from 'react-range';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;



class RangeControl extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      demand: 0,
      temperature: 0,
      values: this.props.values
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
export default class ControlPanel extends PureComponent {

  constructor(props) {
    super(props);

    let demand = parseInt(this.props.params.demand);
    this.state = {
      demand: 0,
      temperature: 0,
      demands: [demand]
    };
  }

  // componentWillMount(){
  //   this.setState({values : [this.props.params.demand]});
  // }

  render() {
    const {time} = this.props;
    
    return (
        <div className="text-center" >
        <Box.Wrapper   >
            <Box.Header>
                    <Box.Title>Decision Input</Box.Title>
                </Box.Header>
                <Box.Body>

        <div className="text-left" >
          <p>Set parameters for crop decision prediction
            <br/>
             from <b>2020-02-19 {time}</b> to <b>2020-02-19 {time}</b>
          </p>
          <hr />
        </div>
        {/* <div className="text-left" >
          <label>Demand</label>
          <input
            className="slider form-control"
            data-slider-id="purple"
            type="range"
            // disabled={allDay}
            min={0}
            max={10000000}
            step={1000}
            value={this.state.demand}
            onChange={event => { console.log(event.target.value); this.setState({ demand: event.target.value });}}
            // onChange={_onChangeDay}
            />
        </div>
        <div className="text-left" >
          <label>Temperature</label>
          <input
            className="slider form-control"
            data-slider-id="purple"
            type="range"
            // disabled={allDay}
            min={-5}
            max={5}
            step={0.1}
            value={this.state.temperature}
            // onChange={temperature => this.setState({ temperature })}
            // onChange={_onChangeDay}
            />
        </div> */}
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
        
        </Box.Body>

        </Box.Wrapper>
        </div>
    );
  }
}
