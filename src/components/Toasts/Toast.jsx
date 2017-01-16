
import React from 'react';
import classNames from 'classnames';
import { Mask } from '../Mask';

import {
  Icon,
} from '../../components/index';

export default class Toast extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool,
    duration: React.PropTypes.number,
    message: React.PropTypes.string,
    onRequestClose: React.PropTypes.func,
    onClose: React.PropTypes.func
  };

  static defaultProps = {
    open: false,
    message: '',
    duration: 2000,
  };

  // 组件插入DOM之前
  componentWillMount() {
    // console.log('Component: 组件插入DOM之前');
    this.setState({
      open: this.props.open,
      message: this.props.message
    });
  }

  // 已加载组件收到新的参数时调用
  componentWillReceiveProps(nextProps) {
    // console.log(`Component: 已加载组件收到新的参数，open: ${nextProps.open}`);
    if (this.props.open && nextProps.open && (nextProps.message !== this.props.message)) {
      this.setState({
        open: false,
      });
    } else {
      const open = nextProps.open;
      this.setState({
        open: open !== null ? open : this.state.open,
        message: nextProps.message
      });
    }
  }

  // 组件更新后
  componentDidUpdate(prevProps, prevState) {
    // console.log(`Component: 组件更新后, NowState: ${this.state.open}`);
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this.autoClose();
      }
    }
  }

  // 组件插入DOM后
  componentDidMount(){
    // console.log('Component: 组件插入DOM后');
    if (this.props.open) {
      this.autoClose();
    }
  }

  // 清理setTimeout
  componentWillUnmount() {
    clearTimeout(this.toastFunc);
  }

  // 自动关闭
  autoClose() {
    // console.log('Component: 准备关闭');
    const duration = this.props.duration;
    if (duration > 0) {
      this.toastFunc = setTimeout(() => {
        if (this.props.open !== null && this.props.onRequestClose) {
          this.props.onRequestClose();
        } else {
          this.setState({open: false});
        }
      }, duration)
    }
  }

  render() {
    const { icon, message, gif } = this.props;
    const { open } = this.state;

    const toastIcon = icon && (
      <div className="toast-icon">
        <Icon className={icon}></Icon>
      </div>
    );
    const toastGif = gif && (
      <div className="toast-gif">
        <img src={gif} />
      </div>
    );

    return (
      <div>
        {open &&
          <div>
            <Mask transparent/>
            <div className="toast">
              <div className="toast-content">
                {toastGif}
                {toastIcon}
                {message}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}