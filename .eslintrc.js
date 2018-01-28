module.exports = {
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  },
  "extends": "airbnb-base",
  globals: { _: true },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
  },
};
