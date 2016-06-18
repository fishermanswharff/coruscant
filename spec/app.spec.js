import React from 'react'
import { render } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom';
import TempForm from '../app/js/components/tempForm';
import TempInput from '../app/js/components/tempInput';
var Promise = require('es6-promise').Promise;

describe('Temperature Converter', () => {
  let utils = TestUtils;
  let component = utils.renderIntoDocument(<TempForm/>);
  component.defaultProps = {
    fahrenheitConstant: 32,
    kelvinConstant: 273.15,
    input: 32,
    output: 0,
    formats: ['fahrenheit', 'celsius', 'kelvin']
  };
  let container = document.createElement('main');

  beforeEach(() => {
    component.setState({
      input: 32,
      output: 0,
      inputFormat: 'fahrenheit',
      outputFormat: 'celsius'
    });
  });

  it('has a form with inputs', () => {
    let form = utils.findRenderedDOMComponentWithTag(component, 'form');
    expect(form).toBeDefined();
  });

  describe('fahrenheit to celsius', () => {
    let input, output, inputComponent, outputComponent;

    beforeEach(() => {
      input = utils.scryRenderedDOMComponentsWithTag(component, 'input')[0];
      output = utils.scryRenderedDOMComponentsWithTag(component, 'input')[1];
      inputComponent = utils.scryRenderedComponentsWithType(component, TempInput)[0];
      outputComponent = utils.scryRenderedComponentsWithType(component, TempInput)[1];
    });

    it('has initial value of 32', () => {
      expect(input.value).toEqual('32');
    });

    it('converts to celsius', () => {
      utils.Simulate.change(input, { target: { value: 98.6 }});
      expect(inputComponent.props.temp).toEqual(98.6);
      // expect(outputComponent.props.temp).toEqual(37);
    });
  });
});
