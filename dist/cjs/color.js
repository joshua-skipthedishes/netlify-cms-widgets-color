'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var createReactClass = _interopDefault(require('create-react-class'));
var PropTypes = _interopDefault(require('prop-types'));
var ImmutablePropTypes = _interopDefault(require('react-immutable-proptypes'));
var reactColor = require('@pake/react-color');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var DEFAULT_FORMAT = 'hex';
var DEFAULT_COLOR = '#ffffff';
var Control = createReactClass({
  displayName: "Control",
  propTypes: {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string.isRequired,
    value: PropTypes.node,
    setActiveStyle: PropTypes.func.isRequired,
    setInactiveStyle: PropTypes.func.isRequired,
    classNameWrapper: PropTypes.string.isRequired,
    field: ImmutablePropTypes.mapContains({
      format: PropTypes.oneOf(['hex', 'rgb', 'hsl']),
      "default": PropTypes.string,
      presets: ImmutablePropTypes.list,
      alpha: PropTypes.bool
    }).isRequired
  },
  getDefaultProps: function getDefaultProps() {
    return {
      value: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      displayColorPicker: false
    };
  },
  handleChangeComplete: function handleChangeComplete(color) {
    var _this$props = this.props,
        field = _this$props.field,
        onChange = _this$props.onChange;
    var alpha = !field.get('alpha', true);
    var format = field.get('format') || DEFAULT_FORMAT;
    var selected = color[format];

    if (typeof selected !== 'string') {
      var type = "".concat(format).concat(alpha ? 'a' : '');
      var value = Object.values(selected).join(', ');
      selected = "".concat(type, "(").concat(value, ")");
    }

    onChange(selected);
  },
  handleClick: function handleClick() {
    var displayColorPicker = this.state.displayColorPicker;
    this.setState({
      displayColorPicker: !displayColorPicker
    });
  },
  handleClose: function handleClose() {
    this.setState({
      displayColorPicker: false
    });
  },
  render: function render() {
    var _this$props2 = this.props,
        forID = _this$props2.forID,
        field = _this$props2.field,
        value = _this$props2.value,
        classNameWrapper = _this$props2.classNameWrapper,
        setActiveStyle = _this$props2.setActiveStyle,
        setInactiveStyle = _this$props2.setInactiveStyle;
    var props = {
      presetColors: undefined,
      color: value || field.get('default') || DEFAULT_COLOR,
      disableAlpha: !field.get('alpha', true)
    };

    if (field.has('presets')) {
      props.presetColors = field.get('presets').toArray();
    }

    var displayColorPicker = this.state.displayColorPicker;
    var styles = {
      color: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: props.color,
        "float": 'left',
        marginRight: '10px'
      },
      swatch: {
        minWidth: '120px',
        padding: '8px',
        background: '#ffffff',
        display: 'inline-block',
        cursor: 'pointer',
        borderRadius: '25px',
        textAlign: 'left'
      },
      hex: {
        verticalAlign: 'middle',
        lineHeight: '30px'
      },
      popover: {
        position: 'absolute',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    };
    return React.createElement("div", {
      id: forID,
      className: classNameWrapper,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle
    }, React.createElement("button", {
      style: styles.swatch,
      onClick: this.handleClick,
      type: "button"
    }, React.createElement("div", {
      style: styles.color
    }), React.createElement("span", {
      style: styles.hex
    }, props.color)), displayColorPicker ? React.createElement("div", {
      style: styles.popover
    }, React.createElement("div", {
      tabIndex: 0,
      role: "button",
      style: styles.cover,
      onClick: this.handleClose,
      onKeyPress: this.handleClose
    }), React.createElement(reactColor.SketchPicker, _extends({
      onChangeComplete: this.handleChangeComplete
    }, props))) : null);
  }
});

var index = {
  Control: Control
};

module.exports = index;
