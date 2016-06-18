import React from 'react';
import BaseComponent from './baseComponent';

export default class TempConverterApp extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.bind();
  }

  render(){
    return (
      <section>
        {this.props.children}
      </section>
    )
  }
}
