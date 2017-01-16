
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class CellsTitle extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }
  
  render() {
    const {className} = this.props;
    const cls = classNames({
      'cells-title': true,
      [className]: className
    });

    return (
      <div className={cls}>{this.props.children}</div>  
    );
  }
};
