import React, { PropTypes } from 'react';
import { ReactDOM } from 'react-dom';
import classNames from 'classnames';

const STATE = {
  init: '',  // 初始化
  pulling: 'pulling',  // 正在下拉
  enough: 'pulling enough',  // 下拉位置已经足够
  refreshing: 'refreshing',  // 正在刷新
  refreshed: 'refreshed',  // 已经刷新
  reset: 'reset',  // 重置
  loading: 'loading',  // 正在加载中
};

/**
 * 结束后的状态
 */
const endState = {
  loaderState: STATE.reset,
  pullHeight: 0,
};

function addEvent(obj, type, fn) {
  if (obj.attachEvent) {
    obj[`e${type}${fn}`] = fn;
    obj[type + fn] = function () { obj[`e${type}${fn}`](window.event); };
    obj.attachEvent(`on${type}`, obj[type + fn]);
  } else {
    obj.addEventListener(type, fn, false);
  }
}

function removeEvent(obj, type, fn) {
  if (obj.detachEvent) {
    obj.detachEvent(`on${type}`, obj[type + fn]);
    obj[type + fn] = null;
  } else {
    obj.removeEventListener(type, fn, false);
  }
}

export default class PullLoader extends React.Component {

  static propTypes = {
    onRefresh: PropTypes.func.isRequired,  // 刷新函数
    hasMore: PropTypes.bool,  // 是否加载更多
    onLoadMore: PropTypes.func,  // 加载更多函数
    offsetScrollTop: PropTypes.number,  // 顶部滚动距离
    downEnough: PropTypes.number,  // 下拉满足刷新的距离
    distanceBottom: PropTypes.number,  // 距离底部距离触发加载更多
    isBlockContainer: PropTypes.bool,
  }

  /**
   * props默认值
   */
  static defaultProps = {
    hasMore: true,
    offsetScrollTop: 1,
    downEnough: 100,
    distanceBottom: 100,
    isBlockContainer: false,
    className: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      loaderState: STATE.init,
      pullHeight: 0,
    };

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onPullDownMove = this.onPullDownMove.bind(this);
    this.onPullUpMove = this.onPullUpMove.bind(this);
    this.onPullDownRefresh = this.onPullDownRefresh.bind(this);
    this.container = null;
  }

  componentDidMount() {
    const {
      isBlockContainer,
      offsetScrollTop,
      downEnough,
      distanceBottom,
    } = this.props;
    this.defaultConfig = {
      container: isBlockContainer ? ReactDOM(this) : document.body,
      offsetScrollTop,
      downEnough,
      distanceBottom,
    };

    addEvent(this.container, 'touchstart', this.onTouchStart);
    addEvent(this.container, 'touchmove', this.onTouchMove);
    addEvent(this.container, 'touchend', this.onTouchEnd);
  }

  componentWillUnMount() {
    removeEvent(this.container, 'touchstart', this.onTouchStart);
    removeEvent(this.container, 'touchmove', this.onTouchMove);
    removeEvent(this.container, 'touchend', this.onTouchEnd);
  }

  // 拖拽的缓动公式 - easeOutSine
  easing(distance) {
    // t: current time, b: begInnIng value, c: change In value, d: duration
    const t = distance;
    const b = 0;
    const d = screen.availHeight; // 允许拖拽的最大距离
    const c = d / 2.5; // 提示标签最大有效拖拽距离

    return (c * Math.sin((t / d) * (Math.PI / 2))) + b;
  }

  /**
   * 判断是否刷新
   */
  canRefresh() {
    return this.props.onRefresh &&
            ![STATE.refreshing, STATE.loading].includes(this.state.loaderState);
  }

  /**
   * 上拉加载
   */
  onPullDownMove(data) {
    if (!this.canRefresh()) return false;

    let loaderState;
    let diff = data[0].touchMoveY - data[0].touchStartY;
    if (diff < 0) {
      diff = 0;
    }
    diff = this.easing(diff);
    if (diff > this.defaultConfig.downEnough) {
      loaderState = STATE.enough;
    } else {
      loaderState = STATE.pulling;
    }
    this.setState({
      pullHeight: diff,
      loaderState,
    });
  }

  /**
   * 下拉刷新
   */
  onPullUpMove() {
    if (!this.canRefresh()) return false;

    const { hasMore, onLoadMore } = this.props;
    if (typeof this.props.onLoadMore === 'function' && hasMore) {
      this.setState({
        pullHeight: 0,
        loaderState: STATE.loading,
      });

      onLoadMore(() => {
        this.setState(endState);
      });
    }
  }

  /**
   * touchEnd后根据状态进行相应的操作
   */
  onPullDownRefresh() {
    if (!this.canRefresh()) return false;

    if (this.state.loaderState === STATE.pulling) {
      this.setState(endState);
    } else {
      this.setState({
        pullHeight: 0,
        loaderState: STATE.refreshing,
      });
      if (typeof this.props.onRefresh === 'function') {
        this.props.onRefresh(() => {
          this.setState({
            pullHeight: 0,
            loaderState: STATE.refreshed,
          });
          setTimeout(() => {
            this.setState(endState);
          }, 1000);
        }, () => {
          this.setState(endState);
        });
      }
    }
  }

  /**
   * touchStart
   */
  onTouchStart(e) {
    const touch = e.changedTouches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
  }

  /**
   * touchMove
   */
  onTouchMove(e) {
    const scrollTop = this.defaultConfig.container.scrollTop;
    const scrollHeight = this.defaultConfig.container.scrollHeight;
    const conH = this.defaultConfig.container === document.body ?
                  document.documentElement.clientHeight : this.defaultConfig.container.offsetHeight;
    const targetEvent = e.changedTouches[0];
    const currentX = targetEvent.clientX;
    const currentY = targetEvent.clientY;
    const diffX = currentX - this.startX;
    const diffY = currentY - this.startY;
    if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
      if (diffY > 5 && scrollTop < this.defaultConfig.offsetScrollTop) {
        e.preventDefault();
        this.onPullDownMove([{
          touchStartY: this.startY,
          touchMoveY: currentY,
        }]);
      } else if (diffY < 0 &&
                  (scrollHeight - scrollTop - conH) < this.defaultConfig.distanceBottom) {
        // e.preventDefault();
        this.onPullUpMove([{
          touchStartY: this.startY,
          touchMoveY: currentY,
        }]);
      }
    }
  }

  /**
   * touchEnd
   */
  onTouchEnd(e) {
    const scrollTop = this.defaultConfig.container.scrollTop;
    const targetEvent = e.changedTouches[0];
    const currentX = targetEvent.clientX;
    const currentY = targetEvent.clientY;
    const diffX = currentX - this.startX;
    const diffY = currentY - this.startY;

    if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
      if (diffY > 5 && scrollTop < this.defaultConfig.offsetScrollTop) {
        this.onPullDownRefresh();
      }
    }
  }

  render() {
    const {
      children,
      onRefresh,
      onLoadMore,
      hasMore,
      initializing,
      className,
      offsetScrollTop,
      downEnough,
      distanceBottom,
      isBlockContainer,
      ...other
    } = this.props;

    const { pullHeight, loaderState } = this.state;

    const msgStyle = pullHeight ? {
      WebkitTransform: `translate3d(0, ${pullHeight}px, 0)`,
      transform: `translate3d(0, ${pullHeight}px, 0)`,
    } : null;

    /**
     *  symbolTop 下拉刷新时顶部提示在下拉多少距离后会有反应（默认50px）
     */
    const symbolTop = pullHeight - 50 > 0 ? pullHeight - 50 : 0;
    const msgStyle2 = pullHeight ? {
      WebkitTransform: `translate3d(0, ${symbolTop}px, 0)`,
      transform: `translate3d(0, ${symbolTop}px, 0)`,
    } : null;

    const boxClassName = classNames({
      [`${className}`]: true,
      tloader: true,
      [`state-${loaderState}`]: true,
    });

    return (
      <div {...other} className={boxClassName} ref={(ins) => { this.container = ins; } }>
        <div className="tloader-symbol" style={msgStyle2}>
          <p className="tloader-msg"><i></i></p>
          <p className="tloader-loading">
            <i className="ui-loading"></i>
          </p>
        </div>
        <div className="tloader-body" style={msgStyle}>
          {children}
        </div>
        <div className="tloader-footer">
          { !hasMore ? <p className="tloader-btn"></p> : null}
          <p className="tloader-loading">
            <i className="ui-loading"></i>
          </p>
        </div>
      </div>
    );
  }
}
