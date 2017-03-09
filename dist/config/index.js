'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _devConfig = require('./configs/dev.configs.json');

var _devConfig2 = _interopRequireDefault(_devConfig);

var _productionConfig = require('./configs/production.configs.json');

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