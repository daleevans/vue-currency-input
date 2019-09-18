/**
 * Vue Currency Input 1.9.1
 * (c) 2019 Matthias Stiller
 * @license MIT
 */
import Vue from 'vue';

var defaultOptions = {
  locale: undefined,
  currency: 'EUR',
  distractionFree: true,
  decimalLength: undefined,
  autoDecimalMode: false,
  hideCurrencySymbol: false,
  hideGroupingSymbol: false,
  min: null,
  max: null
};

var removeLeadingZeros = function (str) { return str.replace(/^0+(0$|[^0])/, '$1'); };
var onlyDigits = function (str) { return str.replace(/\D+/g, ''); };
var count = function (str, search) { return (str.match(new RegExp(("\\" + search), 'g')) || []).length; };
var endsWith = function (str, search) {
  return str.substring(str.length - search.length, str.length) === search
};
var startsWith = function (str, search) {
  return str.substring(0, search.length) === search
};
var removePrefix = function (str, prefix) {
  if (prefix && startsWith(str, prefix)) {
    return str.substr(prefix.length)
  }
  return str
};
var removeSuffix = function (str, suffix) {
  if (suffix && endsWith(str, suffix)) {
    return str.slice(0, suffix.length * -1)
  }
  return str
};
var stripCurrencySymbolAndMinusSign = function (str, ref) {
  var prefix = ref.prefix;
  var suffix = ref.suffix;
  var value = str.replace(prefix, '').replace(suffix, '');
  return {
    value: removePrefix(value, '-'),
    negative: startsWith(value, '-')
  }
};
var isNumber = function (str) { return str.match(/^-?\d+(\.\d+)?$/); };
var parse = function (str, ref) {
  if ( ref === void 0 ) ref = {};
  var prefix = ref.prefix;
  var suffix = ref.suffix;
  var groupingSymbol = ref.groupingSymbol;
  var decimalSymbol = ref.decimalSymbol;
  if (typeof str === 'number') {
    return str
  } else if (str && typeof str === 'string') {
    if (isNumber(str)) {
      return Number(str)
    }
    var ref$1 = stripCurrencySymbolAndMinusSign(str, { prefix: prefix, suffix: suffix });
    var value = ref$1.value;
    var negative = ref$1.negative;
    var numberParts = value.split(decimalSymbol);
    if (numberParts.length > 2) {
      return null
    }
    var integer = numberParts[0].replace(new RegExp(("\\" + groupingSymbol), 'g'), '');
    if (integer.length && !integer.match(/^\d+$/g)) {
      return null
    }
    var number = integer;
    if (numberParts.length === 2) {
      var fraction = numberParts[1];
      if (fraction.length && !fraction.match(/^\d+$/g)) {
        return null
      }
      number += "." + fraction;
    }
    if (number) {
      if (negative) {
        number = "-" + number;
      }
      return Number(number)
    }
  }
  return null
};

var setCaretPosition = function (el, position) { return el.setSelectionRange(position, position); };
var getCaretPositionAfterFormat = function (el, inputtedValue, caretPosition) {
  var ref = el.$ci.currencyFormat;
  var prefix = ref.prefix;
  var suffix = ref.suffix;
  var decimalSymbol = ref.decimalSymbol;
  var decimalLength = ref.decimalLength;
  var groupingSymbol = ref.groupingSymbol;
  var newValue = el.value;
  var decimalSymbolPosition = inputtedValue.indexOf(decimalSymbol) + 1;
  var caretPositionFromLeft = inputtedValue.length - caretPosition;
  if (Math.abs(newValue.length - inputtedValue.length) > 1 && caretPosition <= decimalSymbolPosition) {
    return newValue.indexOf(decimalSymbol) + 1
  } else if (newValue.substr(caretPosition, 1) === groupingSymbol && count(newValue, groupingSymbol) === count(inputtedValue, groupingSymbol) + 1) {
    return newValue.length - caretPositionFromLeft - 1
  } else {
    if (!el.$ci.options.autoDecimalMode && decimalSymbolPosition !== 0 && caretPosition > decimalSymbolPosition) {
      if (onlyDigits(removeSuffix(inputtedValue.substr(decimalSymbolPosition), suffix)).length - 1 === decimalLength) {
        caretPositionFromLeft -= 1;
      }
    }
    return el.$ci.options.hideCurrencySymbolOnFocus
      ? newValue.length - caretPositionFromLeft
      : Math.max(newValue.length - Math.max(caretPositionFromLeft, suffix.length), prefix.length === 0 ? 0 : prefix.length + 1)
  }
};
var getCaretPositionAfterApplyingDistractionFreeFormat = function (ref, ref$1, value, caretPosition) {
  var prefix = ref.prefix;
  var groupingSymbol = ref.groupingSymbol;
  var hideCurrencySymbolOnFocus = ref$1.hideCurrencySymbolOnFocus;
  var hideGroupingSymbolOnFocus = ref$1.hideGroupingSymbolOnFocus;
  var result = caretPosition;
  if (hideCurrencySymbolOnFocus) {
    result -= prefix.length;
  }
  if (hideGroupingSymbolOnFocus) {
    result -= count(value.substring(0, caretPosition), groupingSymbol);
  }
  return Math.max(0, result)
};

var isValidInteger = function (integer, groupingSymbol) { return integer.match(new RegExp(("^-?(0|[1-9]\\d{0,2}(\\" + groupingSymbol + "?\\d{3})*)$"))); };
var isFractionIncomplete = function (value, ref) {
  var decimalSymbol = ref.decimalSymbol;
  var groupingSymbol = ref.groupingSymbol;
  var numberParts = value.split(decimalSymbol);
  return endsWith(value, decimalSymbol) && numberParts.length === 2 && isValidInteger(numberParts[0], groupingSymbol)
};
var checkIncompleteValue = function (value, negative, previousConformedValue, formatConfig) {
  var prefix = formatConfig.prefix;
  var negativePrefix = formatConfig.negativePrefix;
  var suffix = formatConfig.suffix;
  var decimalSymbol = formatConfig.decimalSymbol;
  var decimalLength = formatConfig.decimalLength;
  if (value === '' && negative && previousConformedValue !== negativePrefix) {
    return ("" + negativePrefix + suffix)
  } else if (decimalLength > 0) {
    if (isFractionIncomplete(value, formatConfig)) {
      return ("" + (negative ? negativePrefix : prefix) + value + suffix)
    } else if (startsWith(value, decimalSymbol)) {
      return ((negative ? negativePrefix : prefix) + "0" + decimalSymbol + ((onlyDigits(value.substr(1)).substr(0, decimalLength))) + suffix)
    }
  }
  return null
};
var getAutoDecimalModeConformedValue = function (value, previousConformedValue, ref) {
  var decimalLength = ref.decimalLength;
  if (value === '') {
    return { conformedValue: '' }
  } else {
    var negative = startsWith(value, '-');
    var conformedValue = value === '-' ? Number(-0) : Number(("" + (negative ? '-' : '') + (removeLeadingZeros(onlyDigits(value))))) / Math.pow(10, decimalLength);
    return {
      conformedValue: conformedValue,
      fractionDigits: conformedValue.toFixed(decimalLength).slice(-decimalLength)
    }
  }
};
var isFractionInvalid = function (fraction, numberOfFractionDigits) { return fraction.length > 0 && numberOfFractionDigits === 0; };
var checkNumberValue = function (value, ref) {
  var decimalLength = ref.decimalLength;
  if (isNumber(value)) {
    var ref$1 = value.split('.');
    var integer = ref$1[0];
    var fraction = ref$1[1];
    if (fraction) {
      fraction = fraction.substr(0, decimalLength);
    }
    return {
      conformedValue: Number((integer + "." + (fraction || ''))),
      fractionDigits: fraction || ''
    }
  }
  return null
};
function conformToMask (str, formatConfig, options, previousConformedValue) {
  if ( previousConformedValue === void 0 ) previousConformedValue = '';
  if (typeof str === 'string') {
    str = str.trim();
    if (options.autoDecimalMode) {
      return getAutoDecimalModeConformedValue(str, previousConformedValue, formatConfig)
    }
    var numberValue = checkNumberValue(str, formatConfig);
    if (numberValue != null) {
      return numberValue
    }
    var ref = stripCurrencySymbolAndMinusSign(str, formatConfig);
    var value = ref.value;
    var negative = ref.negative;
    var incompleteValue = checkIncompleteValue(value, negative, previousConformedValue, formatConfig);
    if (incompleteValue != null) {
      return { conformedValue: incompleteValue }
    }
    var ref$1 = value.split(formatConfig.decimalSymbol);
    var integer = ref$1[0];
    var fraction = ref$1.slice(1);
    var integerDigits = removeLeadingZeros(onlyDigits(integer));
    var fractionDigits = onlyDigits(fraction.join('')).substr(0, formatConfig.decimalLength);
    if (isFractionInvalid(fraction, fractionDigits.length)) {
      return { conformedValue: previousConformedValue }
    }
    var number = integerDigits;
    if (negative) {
      number = "-" + number;
    }
    if (fractionDigits.length > 0) {
      number += "." + fractionDigits;
    }
    if (isNumber(number)) {
      return {
        conformedValue: Number(number),
        fractionDigits: fractionDigits
      }
    } else if (number === '-' && previousConformedValue !== formatConfig.negativePrefix) {
      return { conformedValue: previousConformedValue }
    } else {
      return { conformedValue: '' }
    }
  }
  return { conformedValue: previousConformedValue }
}

function createCurrencyFormat (ref) {
  var locale = ref.locale;
  var currency = ref.currency;
  var numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: currency });
  var str = numberFormat.format(123456);
  var decimalLength = (str.match(/0/g) || []).length;
  var decimalSymbol = decimalLength > 0 ? str.substr(str.indexOf('6') + 1, 1) : null;
  var prefix = str.substring(0, str.indexOf('1'));
  var negativePrefix = numberFormat.format(-1).substring(0, str.indexOf('1') + 1);
  var suffix = str.substring(str.lastIndexOf(decimalLength > 0 ? '0' : '6') + 1);
  var groupingSymbol = str.substr(str.indexOf('3') + 1, 1);
  return {
    prefix: prefix,
    negativePrefix: negativePrefix,
    suffix: suffix,
    groupingSymbol: groupingSymbol,
    decimalSymbol: decimalSymbol,
    decimalLength: decimalLength
  }
}

function dispatchEvent (el, eventName, data) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(eventName, true, true, data);
  el.dispatchEvent(event);
}

var directive = {
  bind: function bind (el, ref, ref$1) {
    var options = ref.value;
    var context = ref$1.context;
    var inputElement = init(el, options, context.$CI_DEFAULT_OPTIONS || defaultOptions);
    Vue.nextTick(function () {
      if (inputElement.value) {
        applyFixedFractionFormat(inputElement);
      }
    });
    inputElement.addEventListener('input', function () {
      if (inputElement.$ci.focus) {
        var value = inputElement.value;
        var selectionStart = inputElement.selectionStart;
        format(inputElement);
        setCaretPosition(inputElement, getCaretPositionAfterFormat(inputElement, value, selectionStart));
      } else {
        format(inputElement);
      }
    }, { capture: true });
    inputElement.addEventListener('format', function (ref) {
      var detail = ref.detail;
      if (!inputElement.$ci.focus) {
        applyFixedFractionFormat(inputElement, detail.value);
      }
    });
    inputElement.addEventListener('focus', function () {
      inputElement.$ci.focus = true;
      var ref = inputElement.$ci;
      var currencyFormat = ref.currencyFormat;
      var options = ref.options;
      var distractionFree = options.distractionFree;
      var hideCurrencySymbol = options.hideCurrencySymbol;
      var hideGroupingSymbol = options.hideGroupingSymbol;
      var hideNegligibleDecimalDigits = options.hideNegligibleDecimalDigits;
      if (distractionFree === true || hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
        setTimeout(function () {
          var value = inputElement.value;
          var selectionStart = inputElement.selectionStart;
          var selectionEnd = inputElement.selectionEnd;
          applyDistractionFreeFormat(inputElement);
          if (Math.abs(selectionStart - selectionEnd) > 0) {
            inputElement.setSelectionRange(0, inputElement.value.length);
          } else {
            setCaretPosition(inputElement, getCaretPositionAfterApplyingDistractionFreeFormat(currencyFormat, options, value, selectionStart));
          }
        });
      }
    });
    inputElement.addEventListener('blur', function () {
      inputElement.$ci.focus = false;
      applyFixedFractionFormat(inputElement);
    });
  },
  componentUpdated: function componentUpdated (el, ref, ref$1) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    var context = ref$1.context;
    if (!!value && optionsChanged(oldValue, value)) {
      var inputElement = init(el, value, context.$CI_DEFAULT_OPTIONS || defaultOptions);
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue);
    }
  }
};
var optionsChanged = function (oldOptions, newOptions) {
  return Object.keys(defaultOptions).some(function (key) { return oldOptions[key] !== newOptions[key]; })
};
var init = function (el, optionsFromBinding, defaultOptions) {
  var inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input');
  if (!inputElement) {
    throw new Error('No input element found')
  }
  var options = Object.assign({}, defaultOptions, optionsFromBinding);
  var min = options.min;
  var max = options.max;
  var decimalLength = options.decimalLength;
  var distractionFree = options.distractionFree;
  var autoDecimalMode = options.autoDecimalMode;
  var hideCurrencySymbol = options.hideCurrencySymbol;
  var hideNegligibleDecimalDigits = options.hideNegligibleDecimalDigits;
  var hideGroupingSymbol = options.hideGroupingSymbol;
  options.hideCurrencySymbolOnFocus = distractionFree === true || distractionFree.hideCurrencySymbol || hideCurrencySymbol;
  options.hideNegligibleDecimalDigitsOnFocus = !autoDecimalMode && (distractionFree === true || distractionFree.hideNegligibleDecimalDigits || hideNegligibleDecimalDigits);
  options.hideGroupingSymbolOnFocus = distractionFree === true || distractionFree.hideGroupingSymbol || hideGroupingSymbol;
  if (min != null && max != null && min > max) {
    throw new Error('Invalid value range')
  }
  if (decimalLength < 0 || decimalLength > 20) {
    throw new Error('Decimal length must be between 0 and 20')
  }
  var currencyFormat = createCurrencyFormat(options);
  if (currencyFormat.decimalLength > 0 && decimalLength !== undefined) {
    currencyFormat.decimalLength = decimalLength;
  }
  inputElement.$ci = Object.assign({}, inputElement.$ci || {},
    {options: options,
    currencyFormat: currencyFormat,
    decimalFormat: Object.assign({}, currencyFormat,
      {prefix: '',
      negativePrefix: '-',
      suffix: ''})});
  return inputElement
};
var applyFixedFractionFormat = function (el, value) {
  if ( value === void 0 ) value = parse(el.value, el.$ci.currencyFormat);
  var ref = el.$ci;
  var ref_options = ref.options;
  var min = ref_options.min;
  var max = ref_options.max;
  var decimalLength = ref.currencyFormat.decimalLength;
  if (value != null) {
    if (min != null && value < min) {
      value = min;
    }
    if (max != null && value > max) {
      value = max;
    }
    value = value.toFixed(decimalLength);
  }
  format(el, value);
  dispatchEvent(el, 'input');
};
var applyDistractionFreeFormat = function (el) {
  var ref = el.$ci;
  var options = ref.options;
  var currencyFormat = ref.currencyFormat;
  var ref$1 = conformToMask(el.value, currencyFormat, options.autoDecimalMode);
  var conformedValue = ref$1.conformedValue;
  var fractionDigits = ref$1.fractionDigits;
  if (typeof conformedValue === 'number') {
    el.value = new Intl.NumberFormat(options.locale, {
      style: options.hideCurrencySymbolOnFocus ? 'decimal' : 'currency',
      useGrouping: !options.hideGroupingSymbolOnFocus,
      currency: options.currency,
      minimumFractionDigits: options.hideNegligibleDecimalDigitsOnFocus ? fractionDigits.replace(/0+$/, '').length : currencyFormat.decimalLength
    }).format(conformedValue);
  }
  el.$ci.previousConformedValue = el.value;
};
var format = function (el, value) {
  if ( value === void 0 ) value = el.value;
  var ref = el.$ci;
  var options = ref.options;
  var decimalFormat = ref.decimalFormat;
  var currencyFormat = ref.currencyFormat;
  var focus = ref.focus;
  var previousConformedValue = ref.previousConformedValue;
  if (value != null) {
    var hideCurrencySymbol = ((focus && options.hideCurrencySymbolOnFocus) || (!focus && options.hideCurrencySymbol));
    var hideGrouping = ((focus && options.hideGroupingSymbolOnFocus) || (!focus && options.hideGroupingSymbol));
    var formatConfig = hideCurrencySymbol ? decimalFormat : currencyFormat;
    var ref$1 = conformToMask(value, formatConfig, options, previousConformedValue);
    var conformedValue = ref$1.conformedValue;
    var fractionDigits = ref$1.fractionDigits;
    if (typeof conformedValue === 'number') {
      el.value = new Intl.NumberFormat(options.locale, {
        style: hideCurrencySymbol ? 'decimal' : 'currency',
        useGrouping: !hideGrouping,
        currency: options.currency,
        minimumFractionDigits: fractionDigits.length
      }).format(conformedValue);
    } else {
      el.value = conformedValue;
    }
  } else {
    el.value = null;
  }
  el.$ci.previousConformedValue = el.value;
  var numberValue = parse(el.value, currencyFormat);
  el.$ci.numberValue = numberValue;
  dispatchEvent(el, 'format-complete', { numberValue: numberValue });
};

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var component = {
  render: function render (h) {
    return h('input', {
      domProps: {
        value: this.formattedValue
      },
      directives: [{
        name: 'currency',
        value: this.options
      }],
      on: this.listeners()
    })
  },
  directives: {
    currency: directive
  },
  name: 'CurrencyInput',
  props: {
    value: {
      type: Number,
      default: null
    },
    locale: {
      type: String,
      default: undefined
    },
    currency: {
      type: String,
      default: undefined
    },
    distractionFree: {
      type: [Boolean, Object],
      default: undefined
    },
    decimalLength: {
      type: Number,
      default: undefined
    },
    autoDecimalMode: {
      type: Boolean,
      default: undefined
    },
    hideCurrencySymbol: {
      type: Boolean,
      default: false
    },
    hideGroupingSymbol: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    }
  },
  data: function data () {
    return {
      formattedValue: this.value
    }
  },
  computed: {
    options: function options () {
      var this$1 = this;
      var options = Object.assign({}, this.$CI_DEFAULT_OPTIONS || defaultOptions);
      Object.keys(defaultOptions).forEach(function (key) {
        if (this$1[key] !== undefined) {
          options[key] = this$1[key];
        }
      });
      return options
    }
  },
  watch: {
    value: function value (value$1) {
      dispatchEvent(this.$el, 'format', { value: value$1 });
    }
  },
  methods: {
    listeners: function listeners () {
      var this$1 = this;
      var ref = this.$listeners;
      var input = ref.input;
      var rest = objectWithoutProperties( ref, ["input"] );
      var listeners = rest;
      return Object.assign({}, listeners,
        {'format-complete': function (ref) {
          var detail = ref.detail;
          this$1.$emit('input', detail.numberValue);
          this$1.formattedValue = this$1.$el.value;
        }})
    }
  }
};

var plugin = {
  install: function install (Vue, ref) {
    if ( ref === void 0 ) ref = {};
    var componentName = ref.componentName; if ( componentName === void 0 ) componentName = component.name;
    var directiveName = ref.directiveName; if ( directiveName === void 0 ) directiveName = 'currency';
    var globalOptions = ref.globalOptions; if ( globalOptions === void 0 ) globalOptions = {};
    var options = Object.assign({}, defaultOptions, globalOptions);
    Vue.prototype.$CI_DEFAULT_OPTIONS = options;
    Vue.component(componentName, component);
    Vue.directive(directiveName, directive);
    Vue.prototype.$parseCurrency = function (str, locale, currency) {
      if ( locale === void 0 ) locale = options.locale;
      if ( currency === void 0 ) currency = options.currency;
      return parse(str, createCurrencyFormat(Object.assign({}, options, {locale: locale, currency: currency})))
    };
  }
};

export default plugin;
export { directive as CurrencyDirective, component as CurrencyInput };
