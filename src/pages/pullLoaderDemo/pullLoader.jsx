
import React from 'react';

import {
  Page,
  Flex, FlexItem,
  Table,
  PullLoader,
} from '../../components/index';
import { Validation } from '../../common/index';

const rowDatas = [
  {
    time: '2016-10-29 20:55',
    loan: '8000.00',
    operate: '申请借款',
  },
  {
    time: '2016-10-29 20:55',
    loan: '8000.00',
    operate: '申请借款',
  },
  {
    time: '2016-10-29 20:55',
    loan: '8000.00',
    operate: '申请借款',
  },
];

export default class PullLoaderTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMore: true,
      data: rowDatas,
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleRefresh(resolve, reject) {
    setTimeout(() => {
      this.setState({
        data: rowDatas,
      });
      resolve();
    }, 3000);
  }

  handleLoadMore(resolve) {
    setTimeout(() => {
      this.setState({
        data: [...this.state.data, rowDatas[0], rowDatas[1]],
      });
      resolve();
    }, 3000);
  }

  render() {
    const headerRows = [
      {
        id: 1,
        title: '时间',
      },
      {
        id: 2,
        title: '金额(元)',
        className: 'text-red',
      },
      {
        id: 3,
        title: '操作',
        className: 'right-arrow',
      },
    ];

    const { hasMore } = this.state;

    return (
      <Page className="page-user page-captical">
        <PullLoader
            downEnough={100}
            onRefresh={this.handleRefresh.bind(this)}
            onLoadMore={this.handleLoadMore.bind(this)}
            hasMore={hasMore}>
          <Table tableClass="table-dashed" headerRows={headerRows} rowDatas={rowDatas} />
        </PullLoader>
      </Page>
    );
  }
}

