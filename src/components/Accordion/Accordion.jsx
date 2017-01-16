import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class Accordion extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    /**
     * open: 手风琴内容显示或隐藏（false为显示）
     * animate: 手风琴内容展示与隐藏的动画，默认为有
     */
    this.state = {
      open: false,
    };

    this.handleToggleAccordion = this.handleToggleAccordion.bind(this);
  }

  // 手风琴伸缩事件
  handleToggleAccordion() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const {
      children,
      title,
      className,
    } = this.props;
    const {
      open,
      show,
    } = this.state;

    const cls = classNames({
      accordion: true,
      active: !open
    });
    const accordionBody = classNames({
      'accordion-body': true,
      'slide-up': open,
      [className]: className,
    });
    return (
      <div className={cls}>
        <div className="accordion-header" onClick={this.handleToggleAccordion}>
          <p className="accordion-title">{title}</p>
        </div>
        <div className={accordionBody} style={{ display: open ? 'none' : 'block' }}>
          {children}
        </div>
      </div>
    );
  }
}
