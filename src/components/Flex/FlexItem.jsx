
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class FlexItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefixCls: PropTypes.string
  };

  static defaultProps = {
    prefixCls: 'flex',
  };

  render() {
    const { className, children, prefixCls, ...others } = this.props;
    const cls = classNames({
      [`${prefixCls}-item`]: true,
      [className]: className
    });

    return (
      <div className={cls} {...others}>{children}</div>
    );
  }
};
