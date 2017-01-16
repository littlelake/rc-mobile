import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Cards,CardHeader,CardBody,CardFooter,
  Icon
} from '../../components/index';

export default class CardTest extends React.Component {
  render() {
    return (
      <Page>
        <Cards>
          <CardHeader>CardHeader</CardHeader>
          <CardBody>CardBody</CardBody>
          <CardFooter>CardFooter</CardFooter>
        </Cards>
        <Cards>
          <CardBody>CardBody</CardBody>
          <CardFooter>CardFooter</CardFooter>
        </Cards>
      </Page>
    );
  }
} 