(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{237:function(t,e,a){"use strict";a.r(e);var n=a(27),s=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"config-reference"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#config-reference","aria-hidden":"true"}},[t._v("#")]),t._v(" Config Reference")]),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",[t._v("You can override the shipped defaults with the "),a("a",{attrs:{href:"#plugin-options"}},[t._v("plugin options")]),t._v(" so you don't have configure each component instance separately.")])]),t._v(" "),a("h2",{attrs:{id:"component-props"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#component-props","aria-hidden":"true"}},[t._v("#")]),t._v(" Component props")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("<currency-input>")]),t._v(" component provides the following props:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Type")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("code",[t._v("value")])]),t._v(" "),a("td",[t._v("Number")]),t._v(" "),a("td",[t._v("The value of the input. "),a("code",[t._v("v-model")]),t._v(" is supported.")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("currency")])]),t._v(" "),a("td",[t._v("String")]),t._v(" "),a("td",[t._v("A "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/ISO_4217",target:"_blank",rel:"noopener noreferrer"}},[t._v("ISO 4217"),a("OutboundLink")],1),t._v(" currency code (for example "),a("code",[t._v("USD")]),t._v(" or "),a("code",[t._v("EUR")]),t._v("). Default is "),a("code",[t._v("EUR")]),t._v(".")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("locale")])]),t._v(" "),a("td",[t._v("String")]),t._v(" "),a("td",[t._v("A "),a("a",{attrs:{href:"https://tools.ietf.org/html/bcp47",target:"_blank",rel:"noopener noreferrer"}},[t._v("BCP 47"),a("OutboundLink")],1),t._v(" language tag (for example "),a("code",[t._v("en")]),t._v(" or "),a("code",[t._v("de-DE")]),t._v("). Default is "),a("code",[t._v("undefined")]),t._v(" (use the runtime's default locale).")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("auto-decimal-mode")])]),t._v(" "),a("td",[t._v("Boolean")]),t._v(" "),a("td",[t._v("Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits. Default is "),a("code",[t._v("false")]),t._v(" (the decimal symbol needs to be inserted manually).")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("decimal-length")])]),t._v(" "),a("td",[t._v("Number")]),t._v(" "),a("td",[t._v("The number of displayed decimal digits. Default is "),a("code",[t._v("undefined")]),t._v(" (use the currency's default). Must be between 0 and 20 and can only be applied for currencies that support decimal digits.")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("distraction-free")])]),t._v(" "),a("td",[t._v("Boolean/Object")]),t._v(" "),a("td",[t._v("Whether to hide negligible decimal digits, the currency symbol and the grouping symbol on focus. Default is "),a("code",[t._v("true")]),t._v(". You can also pass an object of boolean properties to configure each option: "),a("code",[t._v("{hideNegligibleDecimalDigits, hideCurrencySymbol, hideGroupingSymbol}")]),t._v(" (see "),a("router-link",{attrs:{to:"/examples/#distraction-free-mode"}},[t._v("examples")]),t._v("). Using "),a("code",[t._v("false")]),t._v(" will leave the formatted value untouched on focus.")],1)]),t._v(" "),a("tr",[a("td",[a("code",[t._v("min")])]),t._v(" "),a("td",[t._v("Number")]),t._v(" "),a("td",[t._v("Minimum value. Default is "),a("code",[t._v("null")]),t._v(" (no limitation). Must be less than "),a("code",[t._v("max")]),t._v(".")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("max")])]),t._v(" "),a("td",[t._v("Number")]),t._v(" "),a("td",[t._v("Maximum value. Default is "),a("code",[t._v("null")]),t._v(" (no limitation). Must be greater than "),a("code",[t._v("min")]),t._v(".")])])])]),t._v(" "),a("h2",{attrs:{id:"directive-options"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#directive-options","aria-hidden":"true"}},[t._v("#")]),t._v(" Directive options")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("v-currency")]),t._v(" directive supports the same options as the "),a("code",[t._v("<currency-input>")]),t._v(" component which have to be passed as object:")]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-currency")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{\n    currency: 'EUR',\n    locale: undefined,\n    autoDecimalMode: false,\n    decimalLength: undefined,\n    distractionFree: true,\n    min: null,\n    max: null\n  }"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"plugin-options"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#plugin-options","aria-hidden":"true"}},[t._v("#")]),t._v(" Plugin options")]),t._v(" "),a("p",[t._v("To customize the plugin installation you can optionally pass an "),a("code",[t._v("options")]),t._v(" object to "),a("code",[t._v("Vue.use()")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("VueCurrencyInput"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  globalOptions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    currency"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'USD'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// only override the default currency 'EUR' with 'USD'")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  componentName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'MoneyInput'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// now you can use the component with <money-input>")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("Valid object keys are:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Key")]),t._v(" "),a("th",[t._v("Type")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("code",[t._v("globalOptions")])]),t._v(" "),a("td",[t._v("Object")]),t._v(" "),a("td",[t._v("Overriding of the shipped default options. Same object structure as "),a("a",{attrs:{href:"#directive-options"}},[t._v("directive options")]),t._v(".")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("componentName")])]),t._v(" "),a("td",[t._v("String")]),t._v(" "),a("td",[t._v("The name with which the component is to be registered. Default is "),a("code",[t._v("CurrencyInput")]),t._v(".")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("directiveName")])]),t._v(" "),a("td",[t._v("String")]),t._v(" "),a("td",[t._v("The name with which the directive is to be registered. Default is "),a("code",[t._v("currency")]),t._v(".")])])])])])}),[],!1,null,null,null);e.default=s.exports}}]);