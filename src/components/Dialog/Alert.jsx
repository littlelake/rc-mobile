
"use strict";

import React,{ Component,PropTypes } from 'react';
import classNames from 'classnames';
import { Mask } from '../Mask/index';

export default class Alert extends React.Component {
  static propTypes = {
    buttons: PropTypes.array,
    open: PropTypes.bool,
    title: PropTypes.string
  };

  static defaultProps = {
    buttons: [],
    open: false,
    title: ''
  };

  componentWillMount() {
    this.setState({
      open: this.props.open
    });
  }

  actionButtons() {
    return this.props.buttons.map((action, idx) => {
      const {type, label, ...others} = action;
      const cls = classNames({
        'dialog-btn': true,
        'btn-primary': type === 'primary'
      });

      return (
        <button key={idx} className={cls} {...others}>{label}</button>
      );
    });
  }

  render() {
    const {title, open, buttons, children, ...others} = this.props;
    return (
      <div className="dialog-alert" style={{display: open ? 'block' : 'none'}}>
        <Mask/>
        <div className="dialog">
          <div className="dialog-hd">
            <strong className="dialog-title">{title}</strong>
          </div>
          <div className="dialog-bd">
            {children}
          </div>
          <div className="dialog-ft">
            {this.actionButtons()}
          </div>
        </div>
      </div>
    );
  }
}
