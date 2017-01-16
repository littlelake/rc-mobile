import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Wrapper,
  Icon,
} from '../../components/index';

export default class IconTest extends React.Component {
  render() {
    return (
      <Page>
        <Wrapper>
          <Icon>&#xe60f;</Icon>
        </Wrapper>
        <Wrapper>
          <Icon className="icon-primary">&#xe60f;</Icon>
        </Wrapper>
        <Wrapper>
          <Icon className="icon-red">&#xe60f;</Icon>
        </Wrapper>
      </Page>
    );
  }
}
