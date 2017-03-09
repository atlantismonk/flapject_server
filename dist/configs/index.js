'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _devConfig = require('./dev.config.json');

var _devConfig2 = _interopRequireDefault(_devConfig);

var _productionConfig = require('./production.config.json');

var _productionConfig2 = _interopRequireDefault(_productionConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Atlantismonk on 2017/2/25.
 */

exports.default = {
  development: _devConfig2.default,
  production: _productionConfig2.default
}[process.env.NODE_ENV || 'development'];
//# sourceMappingURL=dev.js.map