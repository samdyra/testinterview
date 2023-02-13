// eslint-disable-next-line no-undef
module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    "no-case-declarations": "off",
    "import/first": "off",
    "import/order": "off",
    "react/prop-types": "off",
    "no-use-before-define": "off",
    "no-underscore-dangle": "warn",
    "react-native/no-raw-text": "off",
    "react/jsx-filename-extension": "off",
    "no-multi-spaces": "warn",
    "spaced-comment": "off",
    "eqeqeq": "off",
    "radix": "warn",
    "indent": [ "warn", 2 ] ,
    "react/jsx-indent": [ "warn", 2 ],
    "react/jsx-indent-props": [ "warn", 2 ],
    "brace-style": [ "warn", "stroustrup" ],
    "array-bracket-spacing": [ "warn", "always" ],
    "object-curly-spacing": [ "warn", "always" ],
    "object-curly-newline": [ 2, { "multiline": true, "minProperties": 3 } ],
    "consistent-return": "warn",
    "no-nested-ternary": "off",
    "import/named": "off",
    "one-var":"off",
    "no-plusplus": "warn",
    "no-param-reassign": "warn",
    "no-empty": "off",
    "vars-on-top": "warn",
    "no-restricted-properties": "warn",
    "no-useless-escape":"warn",
    "no-return-await": "warn",
    "no-unneeded-ternary": "warn",
    "class-methods-use-this": "warn",
    "no-lone-blocks": "warn",
    "react/jsx-key": "off"
  }
}
