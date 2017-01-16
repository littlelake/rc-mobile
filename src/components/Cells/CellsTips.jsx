
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class CellsTips extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }
  
  render() {
    const {className} = this.props;
    const cls = classNames({
      'cells-tips': true,
      [className]: className
    });

    return (
      <div className={cls}>{this.props.children}</div>  
    );
  }
};
