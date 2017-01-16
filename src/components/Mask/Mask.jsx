
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Mask extends React.Component {
  static propTypes = {
    transparent: React.PropTypes.bool
  };

  static defaultProps = {
    transparent: false
  };

  render() {
    const {transparent, ...others} = this.props;
    const cls = classNames({
      'mask': !transparent,
      'mask-transparent': transparent
    });

    return (
      <div className={cls} {...others}></div>
    );
  }
};