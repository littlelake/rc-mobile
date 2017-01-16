
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import {
  Page, PageTips, Wrapper,
  CellsTitle, Cells, Cell, CellHeader, CellBody, CellFooter
} from '../../components/index';

export default class Index extends React.Component {

  constructor(props) {
    super(props);

    this.handleCellTest = this.handleCellTest.bind(this);
    this.handleCardTest = this.handleCardTest.bind(this);
    this.handleFlexTest = this.handleFlexTest.bind(this);
    this.handleButtonTest = this.handleButtonTest.bind(this);
    this.handleFooterTest = this.handleFooterTest.bind(this);
    this.handleIconTest = this.handleIconTest.bind(this);
    this.handleAccordionTest = this.handleAccordionTest.bind(this);
    this.handleToastTest = this.handleToastTest.bind(this);
    this.handleTabTest = this.handleTabTest.bind(this);
    this.handleFormTest = this.handleFormTest.bind(this);
    this.handleDialogTest = this.handleDialogTest.bind(this);
    this.handleTableTest = this.handleTableTest.bind(this);
    this.handleWellTest = this.handleWellTest.bind(this);
    this.handlePullLoaderTest = this.handlePullLoaderTest.bind(this);
  }

  handleCellTest() {
    this.context.router.push('/test/cells');
  }

  handleCardTest() {
    this.context.router.push('/test/cards');
  }

  handleFlexTest() {
    this.context.router.push('/test/flex');
  }

  handleButtonTest() {
    this.context.router.push('/test/button');
  }

  handleFooterTest() {
    this.context.router.push('/test/footer');
  }

  handleIconTest() {
    this.context.router.push('/test/icon');
  }

  handleAccordionTest() {
    this.context.router.push('/test/accordion');
  }

  handleToastTest() {
    this.context.router.push('/test/toast');
  }

  handleTabTest() {
    this.context.router.push('/test/tab');
  }

  handleFormTest() {
    this.context.router.push('/test/form');
  }

  handleDialogTest() {
    this.context.router.push('/test/dialog');
  }

  handleTableTest() {
    this.context.router.push('/test/table');
  }

  handleWellTest() {
    this.context.router.push('/test/well');
  }

  handlePullLoaderTest() {
    this.context.router.push('/test/pullLoader');
  }

  render() {
    return (
      <Page>
        <Cells>
          <Cell className="cell-access" onClick={this.handleCellTest}>
            <CellBody>Cell</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleCardTest}>
            <CellBody>Card</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleFlexTest}>
            <CellBody>Flex</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleButtonTest}>
            <CellBody>Button</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleFooterTest}>
            <CellBody>Footer</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleIconTest}>
            <CellBody>Icon</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleAccordionTest}>
            <CellBody>Accordion</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleToastTest}>
            <CellBody>Toast</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleTabTest}>
            <CellBody>Tab</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleFormTest}>
            <CellBody>Form</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleTableTest}>
            <CellBody>Table</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleDialogTest}>
            <CellBody>Dialog</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handleWellTest}>
            <CellBody>Well</CellBody>
            <CellFooter />
          </Cell>
          <Cell className="cell-access" onClick={this.handlePullLoaderTest}>
            <CellBody>PullLoader</CellBody>
            <CellFooter />
          </Cell>
        </Cells>
      </Page>
    );
  }
}

Index.contextTypes = {
  router: React.PropTypes.object.isRequired
}
