
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Icon extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }

  render() {
    const { className, children, ...others } = this.props;
    const cls = classNames({
      'iconfont': true,
      [className]: className
    });

    return (
      <i className={cls} {...others}>{children}</i>
    );
  }
};
