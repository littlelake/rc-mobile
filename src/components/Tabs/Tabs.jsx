
import React, {Component,
  createElement,
  cloneElement,
  Children,
  isValidElement,
  PropTypes,
} from 'react';
import TabContent from './TabContent';
import classNames from 'classnames';

export default class Tabs extends React.Component {
  static propTypes = {
    value: PropTypes.any
  };

  static defaultProps = {
    initialSelectedIndex: 0,
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
  }

  componentWillMount() {
    const valueLink = this.getValueLink(this.props);
    const initialIndex = this.props.initialSelectedIndex;
    this.setState({
      selectedIndex: valueLink.value !== undefined ?
        this.getSelectedIndex(this.props) :
        initialIndex < this.getTabCount() ?
        initialIndex :
        0,
    });
  }

  componentWillReceiveProps(newProps, nextContext) {
    const valueLink = this.getValueLink(newProps);
    const newState = {};
    if (valueLink.value !== undefined) {
      newState.selectedIndex = this.getSelectedIndex(newProps);
    }
    this.setState(newState);
  }

  // 创建各个tab
  getTabs(props = this.props) {
    const tabs = [];

    Children.forEach(props.children, (tab) => {
      if (isValidElement(tab)) {
        tabs.push(tab);
      }
    });
    return tabs;
  }

  // 获取tab数量
  getTabCount() {
    return this.getTabs().length;
  }

  // 获取点击的标签值(双向绑定)
  getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange,
    };
  }

  // 获取初始选中的tab索引
  getSelectedIndex(props) {
    const valueLink = this.getValueLink(props);
    let selectedIndex = -1;

    this.getTabs(props).forEach((tab, index) => {
      if (valueLink.value === tab.props.value) {
        selectedIndex = index;
      }
    });

    return selectedIndex;
  }

  // tab点击事件
  handleTabClick = (value, event, tab) => {
    const valueLink = this.getValueLink(this.props);
    const index = tab.props.index;

    if ((valueLink.value && valueLink.value !== value) || this.state.selectedIndex !== index) {
      valueLink.requestChange(value, event, tab);
    }

    this.setState({selectedIndex: index});

    // 激活回调
    if (tab.props.onActive) {
      tab.props.onActive(tab);
    }
  };


  getSelected(tab, index) {
    const valueLink = this.getValueLink(this.props);
    return valueLink.value ? valueLink.value === tab.props.value :
      this.state.selectedIndex === index;
  }


  render() {
    const {
      className,
      contentContainerClassName,
      contentContainerStyle,
      initialSelectedIndex,
      onChange,
      style,
      tabItemContainerStyle,
      ...other
    } = this.props;

    const cls = classNames({
      'tabs': true,
      [className]: className
    });

    const valueLink = this.getValueLink(this.props);
    const tabValue = valueLink.value;
    const tabContent = [];

    const width = parseFloat(100 / this.getTabCount()).toFixed(2);
    const lineLeft = parseFloat(width * this.state.selectedIndex).toFixed(2);

    const tabs = this.getTabs().map((tab, index) => {
      // 渲染tab内容
      tabContent.push(tab.props.children ?
        <TabContent
          key={index}
          index={index}
          selected={this.getSelected(tab, index)}
          children={tab.props.children}
        /> 
        : undefined);

      return React.cloneElement(tab, {
        key: index,
        index: index,
        selected: this.getSelected(tab, index),
        width: `${width}%`,
        onTouchTap: this.handleTabClick,
      });
    });

    // 渲染底部横线
    const tabLine = this.state.selectedIndex !== -1 ? (
      <div 
        className="tab-line"
        style={{
          left: `${lineLeft}%`,
          width:`${width}%`
        }}
      />
    ) : null;

    return (
      <div className={cls} {...other}>
        <div className="tabs-hd">
          {tabs}
          {tabLine}
        </div>
          {tabContent}
      </div>
    );
  }
}