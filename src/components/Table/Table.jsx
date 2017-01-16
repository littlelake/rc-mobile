
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default class Table extends React.Component {
	
	/**
	 * headerClass: 头部样式
	 * headerRows: 头部rows
	 * rowDatas: table body部分内容
	 * tableClass: table样式
	 */
	static propTypes = {
		headerClass: React.PropTypes.string,
		headerRows: React.PropTypes.array,
		rowDatas: React.PropTypes.any,
		tableClass: React.PropTypes.string
	}

	render() {
		const { 
			headerClass, 
			headerRows, 
			rowDatas, 
			tableClass 
		} = this.props;
		const cls = classNames({
			"table" : true,
			[tableClass]: tableClass
		});
		
		return (
			<table className={cls}>
				<TableHeader headerClass={!headerClass ? 'default' : headerClass} headRows={headerRows} />
				<TableBody rowDatas={rowDatas} headRows={headerRows} />
			</table>
		);
	}
}