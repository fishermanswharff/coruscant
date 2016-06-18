import React from 'react';
import BaseComponent from './baseComponent';
import TempInput from './TempInput';

export default class TempForm extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {
      input: this.props.input,
      output: this.props.output,
      inputFormat: this.props.formats[0],
      outputFormat: this.props.formats[1]
    };
    this.bind('handleInputEvent', 'convertTemperature', 'handleSelectEvent');
  }

  handleInputEvent(newValue, object){
    this.setState({ [`${object.props.stateKey}`]: newValue });
    this.convertTemperature({source: object.props.source, stateKey: object.props.stateKey === 'input' ? 'output' : 'input', newValue: newValue});
  }

  handleSelectEvent(newValue, object){
    let stateKey = object.props.stateKey;
    let secondaryStateKey = stateKey === 'input' ? 'output' : 'input';
    this.setState({
      [`${stateKey}Format`]: newValue,
      [`${secondaryStateKey}Format`]: this.state[`${secondaryStateKey}Format`] === newValue ? this.props.formats.find(element => { return element !== newValue }) : this.state[`${secondaryStateKey}Format`]
    });
    this.convertTemperature({ source: newValue, stateKey: secondaryStateKey, newValue: object.props.temp });
  }

  convertTemperature(options){
    switch(options.source){
      case('fahrenheit'):
        this.setState({[`${options.stateKey}`]: ((options.newValue - this.props.fahrenheitConstant) * 5) / 9});
      break;
      case('celsius'):
        this.setState({[`${options.stateKey}`]: ((options.newValue * 9) / 5) + this.props.fahrenheitConstant});
      break;
      default:
      break;
    }
  }

  render(){
    return(
      <form>
        <TempInput
          temp={this.state.input}
          source={this.state.inputFormat}
          numberChangeHandler={this.handleInputEvent}
          formatChangeHandler={this.handleSelectEvent}
          stateKey='input'
        />
        <TempInput
          temp={this.state.output}
          source={this.state.outputFormat}
          numberChangeHandler={this.handleInputEvent}
          formatChangeHandler={this.handleSelectEvent}
          stateKey='output'
        />
      </form>
    );
  }
}

TempForm.propTypes = {
  fahrenheitConstant: React.PropTypes.number.isRequired,
  kelvinConstant: React.PropTypes.number.isRequired,
  input: React.PropTypes.number.isRequired,
  output: React.PropTypes.number.isRequired,
  formats: React.PropTypes.array.isRequired
};
TempForm.defaultProps = {
  fahrenheitConstant: 32,
  kelvinConstant: 273.15,
  input: 32,
  output: 0,
  formats: ['fahrenheit', 'celsius']
};
