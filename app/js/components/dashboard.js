import React from 'react';
import BaseComponent from './baseComponent';
import TempForm from './tempForm';

export default class TempConverterApp extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.bind();
  }

  render(){
    return (
      <div>
        <TempForm/>
      </div>
    )
  }
}
