
import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class Input extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    type: PropTypes.string,
    value: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    if (value !== this.props.value && value !== this.state.value) {
      this.setState({ value });
    }
  }

  handleBlur = (event) => {
    if (this.props.onBlur) this.props.onBlur(event);
  };

  handleChange = (event) => {
    if (this.props.onChange) this.props.onChange(event, event.target.value);
  };

  handleFocus = (event) => {
    if (this.props.disabled) return;
    if (this.props.onFocus) this.props.onFocus(event);
  };

  render() {
    const { className, id, name, value, ...other } = this.props;

    const props = {
      className: classNames(
        className,
        'form-input',
      ),
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      value: this.state.value,
    };

    return (
      <input {...other} {...props}/>
    );
  }
}

