
"use strict";

import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
import Button from './Button';

class Vcode extends Component {
  static propTypes = {
    content: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    sending: PropTypes.bool
  }

  static defaultProps = {
    disabled: false,
    content: `获取验证码`,
    sending: false,
    cutDown: false,
  };

  componentWillMount() {
    this.setState({
      disabled: this.props.disabled,
      content: this.props.content,
      sending: this.props.sending,
      cutDown: this.props.cutDown,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.sending,this.state.sending)
    if (nextProps.sending && nextProps.sending !== this.state.sending) {
      this.setState({
        sending: nextProps.sending,
        disabled: true,
      });
      // 启用倒计时
      this.countDown(10);
    }
  }

  /**
   * 页面跳转是阻止计时器运作，避免造成内存泄漏
   */
  componentWillUnmount() {
    clearInterval(this.countFunc);
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  // 倒计时
  countDown(time) {
    this.countFunc = setInterval(() => {
      console.log(this.props.cutDown + '----------')
      if (this.props.cutDown) {
        clearInterval(this.countFunc);
        this.setState({
          content: '获取验证码',
          disabled: false,
          sending: false,
        });
        return;
      }
      if (time === 0) {
        clearInterval(this.countFunc);
        this.setState({
          content: `重新发送`,
          disabled: false,
          sending: false,
        });
      } else {
        time--;
        this.setState({
          content: `${time}s`
        })
      }
    }, 1000)
  }

  render() {
    const {className, onClick, sending, ...other} = this.props;
    const {disabled, content} = this.state;

    const cls = ClassNames ({
      'btn-vcode': true,
      [className]: className
    });

    return (
      <Button 
        className={cls}
        disabled = {disabled}
        onClick={this.handleClick.bind(this)}
      >{content}</Button>
    );
  }
}

export default Vcode;