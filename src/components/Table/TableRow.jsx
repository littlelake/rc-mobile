
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class TableRow extends React.Component {
	
	static propTypes = {
		cellData: PropTypes.object,
		cellClass: PropTypes.array,
		cellRender: PropTypes.array
	}

	render() {
		const {cellData, cellClass,cellRender} = this.props;
		return (
			<tr>
				{
					Object.keys(cellData).map((cell,i) => {
						let shows = cellRender[i].render === "" ? cellData[cell] : cellRender[i].render(cellData[cell]);
						return (
							<td key={i} className={cellClass[i]}>{shows}</td>
						)
					})
				}
			</tr>
		)
	}
}