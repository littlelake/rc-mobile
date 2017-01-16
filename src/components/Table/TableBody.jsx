
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import TableRow from './TableRow';

export default class TableBody extends React.Component {

	static propTypes = {
		rowDatas: PropTypes.any,
		headRows: PropTypes.any
	}

	render() {
		const {rowDatas, headRows} = this.props;
		let cellClass = [],cellRender = [];
		
		for(let i=0;i<headRows.length;i++) {
			let obj = {};
			let item = !headRows[i].className ? "" : headRows[i].className,
				render = !headRows[i].render ? "" : headRows[i].render;
			cellClass.push(item);
			obj.render = render;
			cellRender.push(obj);
		}
		return(
			<tbody>
				{
					rowDatas.map((row,i) => {
						return <TableRow cellData={row} cellClass={cellClass} cellRender={cellRender} key={i} />
					})
				}
			</tbody>
		);
	}
}