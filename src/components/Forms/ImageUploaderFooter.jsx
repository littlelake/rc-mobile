
import React from 'react';
import ReactDOM from 'react-dom';

import {
  Input,
  Flex, FlexItem,
  Icon,
} from '../../components/index';

export default class ImageUploaderFooter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      changeValue: '其他材料',
    };

    this.handleToggleFooterName = this.handleToggleFooterName.bind(this);
    this.handleRecoveryFooter = this.handleRecoveryFooter.bind(this);
  }

  /**
   * 点击修改名字按钮
   */
  handleToggleFooterName() {
    this.setState({
      disabled: true,
    }, () => {
      ReactDOM.findDOMNode(this.refs.inputText).focus();
    });
  }

  /**
   * 修改图片名字后返回初始状态
   */
  handleRecoveryFooter() {
    this.setState({
      disabled: false,
      changeValue: ReactDOM.findDOMNode(this.refs.inputText).value,
    });
  }

  render() {
    const { disabled, changeValue } = this.state;

    return (
      <Flex className="uploader-footer-flex">
        <FlexItem style={{ display: disabled ? 'block' : 'none' }}>
          <Input className="text-center" ref='inputText' onBlur={this.handleRecoveryFooter}/>
        </FlexItem>
        <FlexItem className="flex-fouth text-center" style={{ display: !disabled ? 'block' : 'none' }}>
          {changeValue}
        </FlexItem>
        <FlexItem className="text-right" onClick={this.handleToggleFooterName} style={{ display: !disabled ? 'block' : 'none' }}>
          <Icon>&#xe60a;</Icon>
        </FlexItem>
      </Flex>
    );
  }
}
