import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Cells,Cell,CellsTitle,CellsTips,CellHeader,CellBody,CellFooter,
  Icon
} from '../../components/index';

export default class CellTest extends React.Component {

  constructor(props) {
    super(props);

    this.handleClickMe = this.handleClickMe.bind(this);
  }

  handleClickMe() {
    alert('Balabala!!!');
  }

  render() {
    return(
      <Page className="page-cells">
        <Cells>
          <Cell>
            <CellHeader><Icon className="icon-primary">&#xe62f;</Icon></CellHeader>
            <CellBody>CellBody</CellBody>
            <CellFooter />
          </Cell>
          <Cell>
            <CellHeader><Icon className="icon-primary">&#xe62f;</Icon></CellHeader>
            <CellBody>CellBody</CellBody>
            <CellFooter />
          </Cell>
        </Cells>
        <Cells>
          <Cell className="cell-access">
            <CellHeader><Icon className="icon-primary">&#xe62f;</Icon></CellHeader>
            <CellBody>CellBody</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access">
            <CellHeader><Icon className="icon-primary">&#xe62f;</Icon></CellHeader>
            <CellBody>CellBody</CellBody>
            <CellFooter />
          </Cell>
        </Cells>
        <Cells>
          <Cell className="cell-access">
            <CellHeader><Icon className="icon-primary">&#xe62f;</Icon></CellHeader>
            <CellBody>CellBody</CellBody>
            <CellFooter 
              cellFooterText="CellFooter"
            />
          </Cell>
          <Cell className="cell-access">
            <CellHeader><Icon className="icon-primary">&#xe62f;</Icon></CellHeader>
            <CellBody>CellBody</CellBody>
            <CellFooter 
              cellFooterText="CellFooter"
              className="text-primary"
            />
          </Cell>
          <Cell className="cell-access">
            <CellHeader><Icon className="icon-primary">&#xe62f;</Icon></CellHeader>
            <CellBody>CellBody</CellBody>
            <CellFooter 
              cellFooterText="CellFooter"
              className="text-red"
            />
          </Cell>
        </Cells>
        <Cells>
          <Cell className="cell-access">
            <CellHeader><Icon className="icon-primary">&#xe62f;</Icon></CellHeader>
            <CellBody>CellBody</CellBody>
            <CellFooter 
              cellFooterText="ClickMe"
              onClick={this.handleClickMe}
            />
          </Cell>
        </Cells>
        <Cells className="cells-thumb">
          <Cell className="cell-access">
            <CellHeader><Icon className="icon-primary">&#xe62f;</Icon></CellHeader>
            <CellBody>CellBody</CellBody>
            <CellFooter 
              cellFooterText="CellFooter"
            />
          </Cell>
          <Cell className="cell-access">
            <CellHeader><Icon className="icon-primary">&#xe62f;</Icon></CellHeader>
            <CellBody>CellBody</CellBody>
            <CellFooter 
              cellFooterText="CellFooter"
            />
          </Cell>
        </Cells>
      </Page>
    );
  }
}