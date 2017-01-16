
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Wrapper extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }
  
  render() {
    const {className, children} = this.props;

    return (
      <div className="wrapper">{children}</div>
    );
  }
};