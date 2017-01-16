
"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';

import Index from './pages/index/index';
import {CellTest} from './pages/cellDemo/index';
import {CardTest} from './pages/cardDemo/index';
import {FlexTest} from './pages/flexDemo/index';
import {ButtonTest} from './pages/buttonDemo/index';
import {FooterTest} from './pages/footerDemo/index';
import {IconTest} from './pages/iconDemo/index';
import {AccordionTest} from './pages/accordionDemo/index';
import {ToastTest} from './pages/toastDemo/index';
import {TabTest} from './pages/tabDemo/index';
import {FormTest} from './pages/formDemo/index';
import {DialogTest} from './pages/dialogDemo/index';
import {TableTest} from './pages/tableDemo/index';
import {WellTest} from './pages/wellDemo/index';
import {PullLoaderTest} from './pages/pullLoaderDemo/index';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import 'whatwg-fetch';

import './styles/style.scss';
import './styles/iconfont/iconfont.css';

import Test from './pages/test';  // 测试组件

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/index" component={Index} />
      <Route path="/test/cells" component={CellTest} />
      <Route path="/test/cards" component={CardTest} />
      <Route path="/test/flex" component={FlexTest} />
      <Route path="/test/button" component={ButtonTest} />
      <Route path="/test/footer" component={FooterTest} />
      <Route path="/test/icon" component={IconTest} />
      <Route path="/test/accordion" component={AccordionTest} />
      <Route path="/test/toast" component={ToastTest} />
      <Route path="/test/tab" component={TabTest} />
      <Route path="/test/form" component={FormTest} />
      <Route path="/test/dialog" component={DialogTest} />
      <Route path="/test/table" component={TableTest} />
      <Route path="/test/well" component={WellTest} />
      <Route path="/test/pullLoader" component={PullLoaderTest} />

      <Route path="/test" component={Test} />

    </Route>
  </Router>
), document.body.appendChild(document.createElement('div')))