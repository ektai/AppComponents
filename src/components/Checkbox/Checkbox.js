import React from "react";
import PropTypes from "prop-types";
import {
  CheckboxIcon,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon
} from "./svg";
import { StyledCheckbox, HiddenInput, StyledText } from "./StyledCheckbox";

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      checked: props.checked
    };
  }

  componentDidMount() {
    this.ref.current.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps) {
    if (this.props.indeterminate !== prevProps.indeterminate) {
      this.ref.current.indeterminate = this.props.indeterminate;
    }
    if (this.props.checked !== prevProps.checked) {
      this.setState({ checked: this.props.checked });
    }
  }

  onInputChange = e => {
    this.setState({ checked: e.target.checked });
    this.props.onChange && this.props.onChange(e);
  };

  render() {
    //console.log("Checkbox render");
    const { disabled, label, checked, indeterminate } = this.props;
    const { onChange, ...rest } = this.props;
    const newProps = { className: "checkbox" };

    return (
      <StyledCheckbox {...rest}>
        <HiddenInput
          type="checkbox"
          checked={this.state.checked}
          disabled={disabled}
          ref={this.ref}
          onChange={this.onInputChange}
        />

        <>
          {React.createElement(
            indeterminate
              ? CheckboxIndeterminateIcon
              : checked
              ? CheckboxCheckedIcon
              : CheckboxIcon,
            { ...newProps }
          )}
        </>

        {this.props.label && (
          <StyledText as="span" disabled={disabled}>
            {label}
          </StyledText>
        )}
      </StyledCheckbox>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

Checkbox.defaultProps = {
  checked: false
};

export default Checkbox;
