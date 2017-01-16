import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Footer,
} from '../../components/index';

export default class FooterTest extends React.Component {

  static defaultProps = {
    footerData: [
      {
        label: '选店',
        icon: 'icon-xuandian',
        url: '/store',
        sign: 'store',
        active: false
      },
      {
        label: '个人中心',
        icon: 'icon-gerenzhongxin',
        url: '/user',
        sign: 'center',
        active: true
      },
      {
        label: '订单',
        icon: 'icon-dingdan',
        url: '/order',
        sign: 'order',
        active: false
      },
    ],
  }

  render() {
    const {footerData} = this.props;

    return (
      <Page>
        <Footer
          footerData={footerData}
        />
      </Page>
    );
  }
}