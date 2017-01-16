
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class TableHeader extends React.Component {
	
	static propTypes = {
		headerClass: React.PropTypes.string,
		rows: React.PropTypes.array
	}
	
	render() {
		const { headerClass, headRows } = this.props;
		return (
			<thead className={headerClass}>
				<tr>
					{
						headRows.map((row) => {
							return (
								<th key={row.id}>{row.title}</th>
							)
						})	
					}
				</tr>
			</thead>
		)
	}
}