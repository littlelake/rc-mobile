
import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class Mask extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    size: React.PropTypes.string
  };

  static defaultProps = {
    size: 'md'
  };

  render() {
    const {className, style, size, ...others} = this.props;
    const cls = classNames({
      'white-space': true,
      [className]: className
    });

    return (
      <div className={cls} style={style} {...others}></div>
    );
  }
}