
"use strict";

import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import { Mask } from '../Mask';

export default class Confirm extends React.Component {
  static propTypes = {
    buttons: PropTypes.array,
    show: PropTypes.bool,
    title: PropTypes.string
  };

  static defaultProps = {
    buttons: [],
    show: false,
    title: ''
  };

  renderButtons() {
    return this.props.buttons.map((action, idx) => {
      const {type, label, ...others} = action;
      const className = classNames({
        weui_btn_dialog: true,
        default: type === 'default',
        primary: type === 'primary'
      });

      return (
        <a key={idx} href="javascript:;" {...others} className={className}>{label}</a>
      );
    });
  }

  render() {
    const {title, show, children} = this.props;

    return (
      <div className="weui_dialog_confirm" style={{display: show ? 'block' : 'none'}}>
        <Mask/>
        <div className="weui_dialog">
          <div className="weui_dialog_hd">
            <strong className="weui_dialog_title">{title}</strong>
          </div>
          <div className="weui_dialog_bd">
            {children}
          </div>
          <div className="weui_dialog_ft">
            {this.renderButtons()}
          </div>
        </div>
      </div>
    );
  }
}