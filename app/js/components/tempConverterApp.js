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
        <header className='header'>
          <h3>Temperature Converter:</h3>
        </header>
        {this.props.children}
      </section>
    )
  }
}
