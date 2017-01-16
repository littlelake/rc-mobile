import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Wrapper,
  Flex, FlexItem,
  Button,
  Alert,
  ActionSheet,
} from '../../components/index';

export default class DialogTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      alertButtons: [
        {
          type: 'primary',
          label: '取消',
          onClick: this.handleAlertyCancel.bind(this)
        },
        {
          type: 'primary',
          label: '确定',
          onClick: this.handleAlertyOk.bind(this)
        }
      ],
      alert: {
        open: false,
        title: ''
      },
    }

    this.handleAlertyOk = this.handleAlertyOk.bind(this);
    this.handleAlertyCancel = this.handleAlertyCancel.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleActionSheet = this.handleActionSheet.bind(this);
  }

  // 弹出框确定
  handleAlertyOk() {
    this.setState({ alert: { open: false } })
  }

  // 弹出框取消
  handleAlertyCancel() {
    this.setState({ alert: { open: false } })
  }

  handleAlert() {
    this.setState({
      alert: {
        open: true,
        children: 'Balabala!!!'
      },
    });
  }

  handleActionSheet() {
    ActionSheet.showActionSheetWithOptions({
      options: ["面板一","面板二","面板三","取消"],
      cancelButtonIndex: 3,
      destructiveButtonIndex: 1
    },(item) => {
      //每个面板元素所对应的function
      console.log(item);
    });
  }

  render() {
    const {alert,alertButtons} = this.state;

    return (
      <Page>
        <Wrapper>
          <Flex>
            <FlexItem>
              <Button className="btn-primary" onClick={this.handleAlert}>Alert</Button>
            </FlexItem>
            <FlexItem>
              <Button className="btn-primary" onClick={this.handleActionSheet}>ActionSheet</Button>
            </FlexItem>
          </Flex>
        </Wrapper>
        <Alert
          open={alert.open}
          title={alert.title}
          children={alert.children}
          buttons={alertButtons}
        />

      </Page>
    );
  }
}