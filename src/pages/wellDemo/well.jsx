import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Well,
} from '../../components/index';

export default class WellTest extends React.Component {
  render() {
    return (
      <Page>
        <Well 
          text="Boom!!Balabala!!!"
        />
        <Well 
          text="Boom!!Balabala!!!"
          textColor="text-primary"
        />
        <Well 
          icon="icon-tubiaozhizuomoban"
          iconColor="icon-red"
          text="Boom!!Balabala!!!"
        />
        <Well 
          icon="icon-tubiaozhizuomoban"
          text="Boom!!Balabala!!!"
          transparent="true"
        />
      </Page>
    );
  }
}