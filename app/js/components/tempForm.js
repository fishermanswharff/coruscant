import React from 'react';
import BaseComponent from './baseComponent';
import TempInput from './tempInput';
import TempConverter from '../modules/tempConverter';

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
    let secondaryStateKey = object.props.stateKey === 'input' ? 'output' : 'input';
    this.setState({
      [`${object.props.stateKey}`]: newValue
    });
    this.convertTemperature({
      inputFormat: object.props.source,
      outputFormat: this.state[`${secondaryStateKey}Format`],
      stateKey: object.props.stateKey === 'input' ? 'output' : 'input',
      newValue: newValue
    });
  }

  handleSelectEvent(newValue, object){
    let stateKey = object.props.stateKey,
        secondaryStateKey = stateKey === 'input' ? 'output' : 'input',
        secondaryFormat = this.state[`${secondaryStateKey}Format`] === newValue ? this.props.formats.find(element => { return element !== newValue }) : this.state[`${secondaryStateKey}Format`]

    this.setState({
      [`${stateKey}Format`]: newValue,
      [`${secondaryStateKey}Format`]: secondaryFormat
    });

    this.convertTemperature({
      inputFormat: newValue,
      outputFormat: secondaryFormat,
      stateKey: secondaryStateKey,
      newValue: object.props.temp
    });
  }

  convertTemperature(options){
    let converter = new TempConverter();
    switch(options.inputFormat){
      case('fahrenheit'):
        converter.fahrenheitTo(options.outputFormat, options.newValue).then(newValue => {
          this.setState({ [`${options.stateKey}`]: newValue });
        });
      break;
      case('celsius'):
        converter.celsiusTo(options.outputFormat, options.newValue).then(newValue => {
          this.setState({ [`${options.stateKey}`]: newValue });
        });
      break;
      case('kelvin'):
        converter.kelvinTo(options.outputFormat, options.newValue).then(newValue => {
          this.setState({ [`${options.stateKey}`]: newValue });
        });
      default:
      break;
    }
  }

  render(){
    return(
      <form className='temp-converter'>
        <TempInput
          temp={this.state.input}
          source={this.state.inputFormat}
          numberChangeHandler={this.handleInputEvent}
          formatChangeHandler={this.handleSelectEvent}
          stateKey='input'
          ref='input'
        />
        <TempInput
          temp={this.state.output}
          source={this.state.outputFormat}
          numberChangeHandler={this.handleInputEvent}
          formatChangeHandler={this.handleSelectEvent}
          stateKey='output'
          ref='output'
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
  formats: ['fahrenheit', 'celsius', 'kelvin']
};
