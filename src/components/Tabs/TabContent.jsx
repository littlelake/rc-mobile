
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

export default class TabContent extends Component {
  
  static propTypes = {
    children: PropTypes.node,
    selected: PropTypes.bool,
    style: PropTypes.object,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      className, 
      children, 
      value, 
      index, 
      selected, 
      style, 
      onChange
    } = this.props;
    const cls = classNames({
      'tab-panel': true,
      'active': selected ? true : false,
      [className]: className
    });

    return(
        <div
          className={cls}
          value={value}
        >
          {children}
        </div>
    );
  }
}
