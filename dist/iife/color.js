var NetlifyCMSWidgetColor = (function (react,createReactClass,reactColor) {
  'use strict';

  react = react && react.hasOwnProperty('default') ? react['default'] : react;
  createReactClass = createReactClass && createReactClass.hasOwnProperty('default') ? createReactClass['default'] : createReactClass;

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
      return h("div", {
        id: forID,
        className: classNameWrapper,
        onFocus: setActiveStyle,
        onBlur: setInactiveStyle
      }, h("button", {
        style: styles.swatch,
        onClick: this.handleClick,
        type: "button"
      }, h("div", {
        style: styles.color
      }), h("span", {
        style: styles.hex
      }, props.color)), displayColorPicker ? h("div", {
        style: styles.popover
      }, h("div", {
        tabIndex: 0,
        role: "button",
        style: styles.cover,
        onClick: this.handleClose,
        onKeyPress: this.handleClose
      }), h(reactColor.SketchPicker, _extends({
        onChangeComplete: this.handleChangeComplete
      }, props))) : null);
    }
  });

  var index = {
    Control: Control
  };

  return index;

}(window['React'],window['createClass'],window['ReactColor']));
