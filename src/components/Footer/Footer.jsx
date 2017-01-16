
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';

import { 
  Icon
} from '../../components/index';

export default class Footer extends React.Component {

  static defaultProps = {
    children: PropTypes.any,
    className: PropTypes.string,
    footerData: PropTypes.array
  }

  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  /**
   * sign: 当前选中的导航的标志
   * url: 当前选中导航的跳转url
   */
  handleItemClick = (sign,url) => {
    if(url) {
      this.context.router.push(url);
    }
  }

  render() {

    const {
      className,  //footer的样式
      footerData,  //底部导航集合
      ...other
    } = this.props;

    //footer的class样式
    const cls = classNames({
      "footer": true,
      [className]: className
    });

    const children = footerData.map((foot,index) => {
      //footItem的class样式
      const itemCls = classNames({
        "footer-item": true,
        "active": foot.active
      });
      return (
        <button type="button" className={itemCls} onClick={this.handleItemClick.bind(this,foot.sign,foot.url)} key={index}>
          <div>
            <Icon className={foot.icon + " footer-icon"}></Icon>
            <small className="footer-txt">{foot.label}</small>
          </div>
        </button>
      )
    });

    return(
      <div className={cls} {...other}>
        {children}
      </div>
    );
  }    
}

Footer.contextTypes = {
  router: React.PropTypes.object.isRequired
}