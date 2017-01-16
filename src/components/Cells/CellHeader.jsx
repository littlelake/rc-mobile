
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class CellHeader extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }

  render() {
    const {className, ...other} = this.props;
    const cls = classNames({
      'cell-hd': true,
      [className]: className
    });

    return (
      <div className={cls} {...other}>{this.props.children}</div>  
    );
  }
};
