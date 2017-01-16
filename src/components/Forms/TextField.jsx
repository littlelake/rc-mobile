
import React, { PropTypes } from 'react';
import classNames from 'classnames';

import {
  Select,
  Icon,
} from '../../components/index';

export default class TextField extends React.Component {

  static propTypes = {
    inputType: PropTypes.string,
    floatingLabelText: PropTypes.string,
    hintText: PropTypes.string,
    children: PropTypes.any,
    selectData: PropTypes.array,
    hasRemoveIcon: PropTypes.bool,
    inputRef: PropTypes.string,
  }

  constructor(props) {
    super(props);

    /**
     * labelActive: 为了判断当前输入框是否是select，如果是则label变为输入框已输入状态
     * placeholderActive: placeholder是否显示
     * hasRemoveIcon: 是否有删除按钮
     * removeActive: 删除按钮状态
     */
    this.state = {
      labelActive: false,
      placeholderActive: true,
      hasRemoveIcon: false,
      removeActive: false,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleRemoveInfo = this.handleRemoveInfo.bind(this);
  }

  componentDidMount() {
    // 判断是否为select，如果为select，则label为active状态
    if (this.refs.selectField) {
      this.setState({
        labelActive: true,
      });
    }

    // 判断input是否为只可查看状态
    if (this.props.disabled === 'disabled' && this.props.defaultValue !== '') {
      this.setState({
        labelActive: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        labelActive: true,
      });
    }
  }

  onFocus = (e) => {
    const value = e.target.value;
    if (value === '') {
      this.setState({
        labelActive: true,
        placeholderActive: false,
      });
    }
    if (this.props.onFocus) {
      this.props.onFocus(e, e.target.value);
    }
  }

  onBlur = (e) => {
    const value = e.target.value;
    if (value === '') {
      this.setState({
        labelActive: false,
        placeholderActive: true,
      });
    }
    if (this.props.onBlur) {
      this.props.onBlur(e, e.target.value);
    }
  }

  onChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      this.setState({
        placeholderActive: false,
        removeActive: false,
      });
    } else {
      this.setState({
        placeholderActive: true,
        removeActive: true,
      });
    }
    // 如果输入框为select，则labelActive初始化时则为true
    if (e.target.tagName === 'SELECT') {
      this.setState({
        labelActive: true,
      });
    }
    if (this.props.onChange) {
      this.props.onChange(e, e.target.value);
    }
  }

  /**
   * 删除当前输入框的信息
   */
  handleRemoveInfo = () => {
    this.input.value = '';
    this.setState({
      labelActive: false,
      removeActive: false,
    });
  }

  render() {
    /**
     * imputText: input的type类型，默认为text
     * floatingLabelText: label的标题
     * hintText: placeholder显示的信息
     * selectData: 如果输入框为select，则selectData为option的集合
     * hasRemoveIcon: 输入框是否有删除输入文字的按钮
     */
    const {
      inputType = 'text',
      floatingLabelText,
      hintText,
      children,
      selectData,
      hasRemoveIcon,
      inputRef,
      addressValue,
      ...other
    } = this.props;

    const { labelActive, placeholderActive, removeActive } = this.state;
    const cls = {
      type: inputType,
      'data-ref': inputRef,
      'data-address': addressValue,
      ref: (ins) => { this.input = ins; },
      onFocus: (e) => { this.onFocus(e); },
      onBlur: (e) => { this.onBlur(e); },
      onChange: (e) => { this.onChange(e); },
    };
    const placeholderCls = classNames({
      'input-placeholder': true,
      active: placeholderActive,
    });
    const labelCls = classNames({
      active: !!labelActive,
      'label-disable': !!this.props.disabled,
    });
    /**
     * label，如果没有传floatingLabelText则不显示
     */
    const floatingLabel = floatingLabelText && (
      <label className={labelCls} htmlFor="">{floatingLabelText}</label>
    );

    /**
     * placeholder，如果没有传hintText则不显示
     */
    const placeholderText = hintText && (
      <div className={placeholderCls}>{hintText}</div>
    );

    /**
     * 判断输入框是input还是textarea还是select
     */
    let inputText;
    if (selectData) {
      inputText = (
        <Select data={selectData} {...cls} ref="selectField"></Select>
      );
    } else {
      inputText = (
        <input {...other} {...cls}/>
      );
    }

    /**
     * 输入框里面有文字时显示，无文字时隐藏
     */
    const removeIcon = hasRemoveIcon && (
      <Icon className="handle-icon" style={{ display: removeActive ? 'block' : 'none' }} onClick={this.handleRemoveInfo}>&#xe62a;</Icon>
    );

    return (
      <div className="input-container">
        {floatingLabel}
        {placeholderText}
        {inputText}
        <div className="input-line"></div>
        <div className="input-border"></div>
        {removeIcon}
        {children}
      </div>
    );
  }
}
