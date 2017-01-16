
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { Mask } from '../Mask';

import {
  Icon,
  Cells, Cell, CellBody, CellFooter,
  Flex, FlexItem,
  Input,
  Wrapper,
  Button, Vcode,
} from '../../components/index';

export default class InputPopup extends React.Component {
  /**
   * headTitle: 顶部标题
   * bodyTitle: 内容部分标题
   * placeholder: 输入框默认提示
   * inputButton: 输入框后面的文字
   * inputButtonFunc: 点击输入框文字触发方法
   * vcodeButton: 验证码文字
   * vcodeTime: 验证码等待时间
   * leftLink: 左边链接文字
   * leftLinkUrl: 左边链接文字url
   * rightLink: 右边链接文字
   * rightLinkUrl: 右边链接文字url
   * bodyButton: 主体按钮
   * bodyButtonFunc: 主体按钮触发方法，
   * show: popup显示与隐藏
   * cutDown: 倒计时停止
   */
  static propTypes = {
    headTitle: PropTypes.string,
    bodyTitle: PropTypes.string,
    placeholder: PropTypes.string,
    inputButton: PropTypes.string,
    inputButtonFunc: PropTypes.func,
    vcodeButton: PropTypes.string,
    vcodeTime: PropTypes.string,
    leftLink: PropTypes.string,
    leftLinkUrl: PropTypes.string,
    rightLink: PropTypes.string,
    rightLinkUrl: PropTypes.string,
    bodyButton: PropTypes.string,
    bodyButtonFunc: PropTypes.func,
    show: PropTypes.bool,
    cutDown: PropTypes.bool,
  }

  static defaultProps = {
    vcodeTime: '30',
    vocdeButton: '验证码',
    show: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      vcode: {
        sending: false,
      },
    };

    this.handleInputButton = this.handleInputButton.bind(this);
    this.handleBodyButton = this.handleBodyButton.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleVcodeClick = this.handleVcodeClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      show: this.props.show,
    });
  }

  /**
   * 判断cutDown当前的值来改变vcode的值（主要用于停止倒计时,将其倒退到初始情况）
   */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.cutDown) {
      this.state = {
        vcode: {
          sending: false,
        },
      };
    }
  }

  /**
   * 输入框右边按钮事件
   */
  handleInputButton(e) {
    console.log(this.props.inputButtonFunc)
    if (this.props.inputButtonFunc) {
      this.props.inputButtonFunc(e);
    }
  }

  handleBodyButton(e) {
    if (this.props.bodyButtonFunc) {
      this.props.bodyButtonFunc(e);
    }
  }

  /**
   * 获取input输入框中的value值
   */
  onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e, e.target.value);
    }
  }


  handleVcodeClick() {
    this.setState({
      vcode: {
        sending: true,
      },
    });
    return true;
  }

  render() {
    const { vcode } = this.state;

    const {
      headTitle,
      bodyTitle,
      placeholder,
      inputButton,
      inputType,
      inputButtonFunc,
      vcodeButton,
      vcodeTime,
      leftLink,
      leftLinkUrl,
      rightLink,
      rightLinkUrl,
      bodyButton,
      bodyButtonFunc,
      onClick,
      show,
      cutDown,
      ...other
    } = this.props;
    /**
     * 左边链接
     */
    const leftLinkObj = leftLink ? (
      <Link to="/"><small>{leftLink}</small></Link>
    ) : '';

    /**
     * 右边链接
     */
    const rightLinkObj = rightLink ? (
      <Link to="/"><small>{rightLink}</small></Link>
    ) : '';

    /**
     * 底部按钮
     */
    const bodyBtn = bodyButton ? (
      <Wrapper>
        <Button
          className="btn-primary"
          onClick={(e) => { this.handleBodyButton(e); } }
          children={bodyButton}
        />
      </Wrapper>
    ) : '';

    /**
     * input框右边按钮
     */
    const inputButtonType = inputButton ? (
      <CellFooter classNameFooter="vcode-ft" onClick={(e) => { this.handleInputButton(e); } }>
        {inputButton}
      </CellFooter>
    ) : (
      <CellFooter>
        <Vcode
          time={vcodeTime}
          sending={vcode.sending}
          cutDown={cutDown}
          onClick={this.handleVcodeClick}
        />
      </CellFooter>
    );

    /**
     * 主体样式变化
     */
    const popupBody = classNames({
      'popup-body': true,
      'popup-body-top': !bodyTitle && (leftLink || rightLink),
      'popup-body-btm': !leftLink && !rightLink && bodyTitle,
      'popup-body-none': !bodyTitle && !leftLink && !rightLink,
    });

    return (
      <div style={{ display: show ? 'block' : 'none' }}>
        <Mask onClick={onClick}/>
        <div className="popup">
          <div className="popup-header">
            <p>{headTitle}</p>
            <Icon onClick={onClick}>&#xe62a;</Icon>
          </div>
          <div className={popupBody}>
            <small className="des">{bodyTitle}</small>
            <Cells>
              <Cell>
                <CellBody>
                  <Input
                    placeholder={placeholder}
                    type={inputType}
                    onChange={(e) => { this.onChange(e); } }>
                  </Input>
                </CellBody>
                {inputButtonType}
              </Cell>
            </Cells>
            <Flex>
              <FlexItem className="text-left text-primary">
                 {leftLinkObj}
              </FlexItem>
              <FlexItem className="text-right text-primary">
                 {rightLinkObj}
              </FlexItem>
            </Flex>
          </div>
          {bodyBtn}
        </div>
      </div>
    );
  }
}
