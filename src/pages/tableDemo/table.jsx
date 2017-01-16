import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Table,
} from '../../components/index';

export default class TableTest extends React.Component {

  static defaultProps = {
    rowDatas: [
      {
        "time": "2016-10-29 20:55",
        "loan": "8000.00",
        "operate": "申请借款"
      },
      {
        "time": "2016-10-29 20:55",
        "loan": "248.00",
        "operate": "手动还款"
      },
      {
        "time": "2016-10-29 20:55",
        "loan": "248.00",
        "operate": "自动还款"
      },
      {
        "time": "2016-10-29 20:55",
        "loan": "8000.00",
        "operate": "申请借款"
      },
    ]
  }
  constructor(props) {
    super(props);

		this.handleClick = this.handleClick.bind(this);
  }

  handleClick(operate,e) {
		e.preventDefault();
		console.log(operate,e);
	}

  render() {
    const headerRows = [
			{
				id: 1,
				title: "时间",
			},
			{
				id: 2,
				title: "金额(元)",
				className: "text-red"
			},
			{
				id: 3,
				title: "操作",
				className: "right-arrow",
				render: (operate) => {
					return <a href="#" onClick={e => this.handleClick(operate,e)}>{operate}</a>
				}
			}
		];
    const {rowDatas} = this.props;

    return(
      <Page>
        <Table tableClass="table-dashed" headerRows={headerRows} rowDatas={rowDatas} />
      </Page>
    );
  }
}