import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Accordion,
} from '../../components/index';

export default class AccordionTest extends React.Component {
  render() {
    return (
      <Page>
        <Accordion title="AccordionHeader" className="bg-gray" animate="true">
          <div className="accordion-panel">
            AccordionBody
          </div>
        </Accordion>
      </Page>
    );
  }
}
