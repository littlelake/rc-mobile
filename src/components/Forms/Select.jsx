
import React from 'react';
import classNames from 'classnames';

export default class Select extends React.Component {
  static propTypes = {
    data: React.PropTypes.array,
  };

  static defaultProps = {
    data: [],
  };

  constructor(props) {
    super(props);

    this.renderData = this.renderData.bind(this);
  }

  renderData(data) {
    return data.map((item, i) => {
      return <option key={i} value={item.value} {...item}>{ item.label }</option>;
    });
  }

  render() {
    const { className, data, children, ...others } = this.props;
    const cls = classNames({
      'form-select': true,
      [className]: className,
    });

    return (
      <select className={cls} {...others}>
        {data.length > 0 ? this.renderData(data) : children}
      </select>
    );
  }
}

