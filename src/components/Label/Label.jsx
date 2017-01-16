
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Label extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }

  render() {
    const { className, children, ...others } = this.props;
    const cls = classNames({
      [className]: className
    });

    return (
      <label className={cls} {...others}>{children}</label>
    );
  }
};
