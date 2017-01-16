import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Wrapper,
  Cells, Cell, CellHeader, CellBody, CellFooter,
  Cards, CardHeader, CardBody, CardFooter,
  Input, Select, Uploader, TextField, InputPopup, ImageUploader,
  Flex, FlexItem,
  Icon,
  Button, Vcode
} from '../../components/index';

export default class FormTest extends React.Component {

  static defaultProps = {
    selectData: [
      {
        value: 0,
        label: 'label1'
      },
      {
        value: 1,
        label: 'label2'
      }
    ],
  };

  constructor(props) {
    super(props);

    this.state = {
      vcode: {
        sending: false,
      },
      files1: [],
      files2: [],
      files3: [],
      showTag1: false,
      cutDown1: false,
      showTag2: false,
      cutDown2: false,
      inputText: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputButton = this.handleInputButton.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePopupDisappear1 = this.handlePopupDisappear1.bind(this);
    this.handlePopupDisappear2 = this.handlePopupDisappear2.bind(this);
    this.handleInputPopup1 = this.handleInputPopup1.bind(this);
    this.handleInputPopup2 = this.handleInputPopup2.bind(this);
    this.handleVcodeClick = this.handleVcodeClick.bind(this);
  }

  // 关闭自动还款确定按钮
  handleInputButton() {
    console.log(this.state.inputText);
  }

  handleInputChange(e) {
    this.setState({
      inputText: e.target.value,
    });
  }

  handlePopupDisappear1() {
    this.setState({
      showTag1: false,
      cutDown1: true,
    });
  }

  handlePopupDisappear2() {
    this.setState({
      showTag2: false,
      cutDown2: true,
    });
  }

  handleInputPopup1() {
    this.setState({
      showTag1: true,
    })
  }

  handleInputPopup2() {
    this.setState({
      showTag2: true,
    })
  }

  handleVcodeClick() {
    return true;
  }

  render() {
    const { selectData } = this.props;
    const { vcode, files1, showTag1, cutDown1, showTag2, cutDown2 } = this.state;

    return (
      <Page className="page-cells">
        <Cells className="login-cells">
          <Cell>
            <CellBody>
              <Input
                placeholder="手机号码"
                type="tel"
                maxLength={11}
                ref="phoneNum"
                onChange={this.handleInputChange}
                />
            </CellBody>
          </Cell>
          <Cell>
            <CellBody>
              <Input
                placeholder="登录密码"
                type="password"
                maxLength={32}
                ref="password"
                onChange={this.handleInputChange}
                />
            </CellBody>
            <CellFooter>
              <Vcode
                sending={vcode.sending}
                onClick={this.handleVcodeClick}
              />
            </CellFooter>
          </Cell>
        </Cells>
        <Cells>
          <Cell>
            <CellBody>
              <Select data={selectData}></Select>
            </CellBody>
          </Cell>
        </Cells>
        <Cells className="input-cells">
          <Cell>
            <CellBody>
              <TextField
                  hintText="我是placeholder"
                  floatingLabelText="我是label"
                  inputRef="phone"
                  onChange={(e) => { this.handleInputChange(e); } }
              >
              </TextField>
            </CellBody>
          </Cell>
          <Cell>
            <CellBody>
              <TextField
                  inputType="tel"
                  hintText="我的type为tel"
                  floatingLabelText="我是label"
                  inputRef="phone"
                  onChange={(e) => { this.handleInputChange(e); } }
              >
              </TextField>
            </CellBody>
          </Cell>
          <Cell>
            <CellBody>
              <TextField
                  hintText=""
                  floatingLabelText="select"
                  inputRef="selectRef"
                  selectData={selectData}
                  onChange={(e) => { this.handleInputChange(e); } }
              />
            </CellBody>
          </Cell>
        </Cells>
        <Cards>
          <CardBody>
            <Uploader
                title=""
                onChange={(files1) => {
                  this.setState({
                    files1,
                  });
                } }
                fileTips='haha'
                files={this.state.files1}
                showAddBtn={this.state.files1.length < 1}
              />
          </CardBody>
          <CardFooter>开始时会有提示框</CardFooter>
        </Cards>
        <Cards>
          <CardBody>
            <Uploader
                title=""
                onChange={(files2) => {
                  this.setState({
                    files2,
                  });
                } }
                files={this.state.files2}
                showAddBtn={this.state.files2.length < 1}
              />
          </CardBody>
          <CardFooter>开始时没有提示框（一张）</CardFooter>
        </Cards>
        <Cards>
          <CardBody>
            <Uploader
                title=""
                onChange={(files3) => {
                  this.setState({
                    files3,
                  });
                } }
                files={this.state.files3}
                showAddBtn={this.state.files3.length < 4}
              />
          </CardBody>
          <CardFooter>开始时没有提示框（多张）</CardFooter>
        </Cards>
        <Cards>
          <CardBody>
            <Flex>
              <FlexItem>
                <Button className="btn-primary" onClick={this.handleInputPopup1}>InputPopup1</Button>
              </FlexItem>
              <FlexItem>
                <Button className="btn-primary" onClick={this.handleInputPopup2}>InputPopup2</Button>
              </FlexItem>
            </Flex>
          </CardBody>
        </Cards>
        <InputPopup
          show={showTag1}
          headTitle="关闭自动还款"
          bodyTitle="请输入密码"
          placeholder="请输入密码"
          vcodeTime="30"
          cutDown={cutDown1}
          onChange={(e) => { this.handleInputChange(e); } }
          onClick={this.handlePopupDisappear1}
          inputType="password"
          rightLink="忘记密码？"
        />
        <InputPopup
          show={showTag2}
          headTitle="关闭自动还款1"
          bodyTitle="请输入密码"
          placeholder="请输入密码"
          cutDown={cutDown2}
          inputButtonFunc={(e) => { this.handleInputButton(e); } }
          onChange={(e) => { this.handleInputChange(e); } }
          onClick={this.handlePopupDisappear2}
          inputType="password"
          rightLink="忘记密码？"
        />
      </Page>
    );
  }
}