
import React, {Component} from 'react';
import {Tabs,Tab} from '../components/Tabs';
import Page from '../components/Page';


export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      selectedIndex: 1
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return(
      <h1>供测试</h1>
    );
  }
}