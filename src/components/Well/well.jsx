
import React from 'react';
import classNames from 'classnames';
import { Mask } from '../Mask';

import {
  Icon,
} from '../../components/index';

export default class Well extends React.Component {
  static defaultProps = {
    'iconColor': 'icon-primary',
  };

  render() {
    const { icon, text, iconColor, textColor, transparent } = this.props;
    const wellCls = classNames({
      well: true,
      'well-transparent': transparent
    });
    const wellIcon = icon && (
      <Icon className={`well-icon ${icon} ${iconColor}`}></Icon>
    );
    const wellText = text && (
      <small className={textColor}>{text}</small>
    )
    return (
      <div className={wellCls}>
        {wellIcon}
        {wellText}
      </div>
    );
  }
}