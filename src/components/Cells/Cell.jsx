
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Cell extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }

  render() {
    const {className, children, ...others} = this.props;
    const cls = classNames({
      'cells-cell': true,
      [className]: className
    });

    return (
      <div className={cls} {...others}>{children}</div>  
    );
  }
};
