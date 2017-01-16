
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Tab extends Component {

  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.any,
    label: PropTypes.node,
    onActive: PropTypes.func,
    onTouchTap: PropTypes.func,
    selected: PropTypes.bool,
    style: PropTypes.object,
    value: PropTypes.any,
    width: PropTypes.string
  };

  handleTouchTap = (event) => {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(this.props.value, event, this);
    }
  };

  render() {
    const {
      className,
      index,
      onTouchTap,
      onActive,
      selected,
      label,
      style,
      value,
      width,
      ...other
    } = this.props;

    const cls = classNames({
      'tab': true,
      'active': selected ? true : false,
      [className]: className
    });

    return (
      <div
        className={cls}
        style={{width: width}}
        onTouchTap={this.handleTouchTap}
        value={value}
        {...other}
      >
        {label}
      </div>
    );
  }
}
