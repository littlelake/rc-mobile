
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class PageTips extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }

  render() {

    const { className, content, ...others } = this.props;
    const cls = classNames({
      'page-tips': true,
      [className]: className
    });

    return (
      <div className={cls} {...others}>{content}</div>
    );
  }
};