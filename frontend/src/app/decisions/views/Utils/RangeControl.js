import React, {PureComponent} from "react"
import { Range } from 'react-range';

export default class RangeControl extends PureComponent {

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