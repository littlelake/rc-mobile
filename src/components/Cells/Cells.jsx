
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Cells extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }

  render() {
    const {className, children, ...other} = this.props;
    const cls = classNames({
      'cells': true,
      [className]: className
    });

    return (
      <div className={cls} {...other}>{children}</div>  
    );
  }
};
