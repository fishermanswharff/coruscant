import React from 'react';
import BaseComponent from './baseComponent';

export default class TempInput extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.bind('onInputHandler', 'onSelectHandler');
  }

  onInputHandler(event){
    this.props.numberChangeHandler(event.target.value, this);
  }

  onSelectHandler(event){
    this.props.formatChangeHandler(event.target.value, this);
  }

  render(){
    return(
      <div className='form-group'>
        <input type='number' value={this.props.temp} onChange={this.onInputHandler}/>
        <select value={this.props.source} onChange={this.onSelectHandler}>
          <option value='fahrenheit'>Fahrenheit</option>
          <option value='celsius'>Celsius</option>
        </select>
      </div>
    )
  }
}
