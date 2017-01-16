import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Wrapper,
  Button,
} from '../../components/index';

export default class ButtonTest extends React.Component {
  render() {
    return (
      <Page>
        <Wrapper>
          <Button>Button</Button>
        </Wrapper>
        <Wrapper>
          <Button className="btn-primary">Button</Button>
        </Wrapper>
        <Wrapper>
          <Button className="btn-red">Button</Button>
        </Wrapper>
        <Wrapper>
          <Button className="btn-gray">Button</Button>
        </Wrapper>
        <Wrapper>
          <Button className="btn-green">Button</Button>
        </Wrapper>
        <Wrapper>
          <Button className="btn-orange">Button</Button>
        </Wrapper>
        <Wrapper>
          <Button disabled>Button</Button>
        </Wrapper>
      </Page>
    );
  }
}