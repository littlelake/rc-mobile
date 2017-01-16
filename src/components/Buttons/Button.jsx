
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    once: PropTypes.bool,
    style: PropTypes.object
  }

  constructor (props) {
    super(props);
    
    this.state = {
      disabled: props.disabled
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      this.setState({ disabled: nextProps.disabled });
    }
  }

  disable() {
    this.setState({ disabled: true});
  }

  enable() {
    this.setState({ disabled: false });
  }

  handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e,e.target.value);
    }
    if (this.props.once) {
      this.disable();
    }
  }

  render() {
    const {
      className,
      id, 
      disabled, //按钮是否可以点击
      onClick,  //按钮的点击时间
      type, 
      children, 
      style, 
      ...other
    } = this.props;

    const cls = classNames ({
      'btn': true,
      [className]: className
    });

    return (
      <button onClick={(e) => this.handleClick(e)}
        style={style}
        disabled={disabled}
        className={cls}
        type={type || 'button'}>
        { children }
      </button>
    );
  }
}
