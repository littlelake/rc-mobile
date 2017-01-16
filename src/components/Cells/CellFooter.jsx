
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class CellFooter extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }
  render() {

    const { cellFooterText, className, classNameFooter, ...other } = this.props;
    const cls = classNames({
      'cell-ft': true,
      [classNameFooter]: classNameFooter,
    });
    const footerCls = classNames({
      'cell-right-txt': true,
      'text-gray': !className,
      [className]: className
    })

    return (
      <div className={cls} {...other}>
        {cellFooterText ? (
          <span className={footerCls}>{cellFooterText}</span>
        ) : this.props.children}
      </div>  
    );
  }
};
