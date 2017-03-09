'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _arguments = require('./config/dev.config.json');

var _arguments2 = _interopRequireDefault(_arguments);

var _mongo = require('./mongo');

var _mongo2 = _interopRequireDefault(_mongo);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaOnerror = require('koa-onerror');

var _koaOnerror2 = _interopRequireDefault(_koaOnerror);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaSession = require('koa-session');

var _koaSession2 = _interopRequireDefault(_koaSession);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _routers = require('./routers');

var _routers2 = _interopRequireDefault(_routers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global._args = _arguments2.default; //导入全局变量


/**
 * Created by Atlantismonk on 2017/1/2.
 * 系统入口
 *
 */

//运行链接mongo代码


var app = new _koa2.default();

/**
 * 错误信息
 */
(0, _koaOnerror2.default)(app);
app.on('error', function (err, ctx) {
  console.error('server error', err);
});

/**
 * 日志
 */
app.use((0, _koaLogger2.default)());

/**
 * 连接mongo
 */
(0, _mongo2.default)();

/**
 * 设置 Cookie 签名密钥
 * session
 */
app.keys = ['secret']; //设置 Cookie 签名密钥
app.use((0, _koaConvert2.default)((0, _koaSession2.default)(app)));

/**
 * body解析器
 */
app.use((0, _koaBodyparser2.default)());

/**
 * 路由入口
 */
exports.app = app = (0, _routers2.default)(app);

exports.app = app;
//# sourceMappingURL=app.js.map