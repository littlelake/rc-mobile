
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Button from './Button';

export default class Vcode extends React.Component {
  static propTypes = {
    content: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    sending: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
    content: '获取验证码',
    sending: false,
    time: 30,
    cutDown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      disabled: this.props.disabled,
      content: this.props.content,
      sending: this.props.sending,
      cutDown: this.props.cutDown,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * 页面跳转是阻止计时器运作，避免造成内存泄漏
   */
  componentWillUnmount() {
    clearInterval(this.countFunc);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.sending && nextProps.sending !== this.state.sending) {
  //     this.setState({
  //       sending: nextProps.sending,
  //       disabled: true,
  //     });
  //     // 启用倒计时
  //     this.countDown(this.props.time);
  //   }
  // }

  handleClick() {
    console.log(111)
    if (this.props.onClick) {
      if (this.props.onClick()) {
        this.setState({
          sending: false,
          disabled: true,
        });
        // 启用倒计时
        this.countDown(this.props.time);
      }
      this.props.onClick();
    }
  }

  // 倒计时
  countDown(time) {
    this.countFunc = setInterval(() => {
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
          content: '重新发送',
          disabled: false,
          sending: false,
        });
      } else {
        time -= 1;
        this.setState({
          content: `${time}s`,
        });
      }
    }, 1000);
  }

  render() {
    const { className, onClick, sending, ...other } = this.props;
    const { disabled, content } = this.state;

    const cls = classNames({
      'btn-vcode': true,
      [className]: className,
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
