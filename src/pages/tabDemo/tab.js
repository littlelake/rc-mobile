import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Wrapper,
  Tabs, Tab,
} from '../../components/index';

export default class TabTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
    }

    this.handleActive = this.handleActive.bind(this);
  }

  handleActive(tab) {
    const index = tab.props.index;
  }

  render() {
    const {slideIndex} = this.state;

    return (
      <Page>
        <Tabs
          className="lined"
          onChange={this.handleChange}
          value={slideIndex}
        >
          <Tab label="TAB1" value={0} onActive={this.handleActive} />
          <Tab label="TAB2" value={1} onActive={this.handleActive} />
          <Tab label="TAB3" value={2} onActive={this.handleActive} />
        </Tabs>
      </Page>
    );
  }
}
