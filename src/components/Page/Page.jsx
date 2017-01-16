
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Page extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }

  render() {
    
    const { className, children, ...others } = this.props;
    const cls = classNames({
      'page': true,
      [className]: className
    });

    return (
      <div className={cls} {...others}>{children}</div>
    );
  }
};

