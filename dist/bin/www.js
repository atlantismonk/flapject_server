#!/usr/bin/env node
'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _configs = require('../configs');

var _configs2 = _interopRequireDefault(_configs);

var _log = require('../configs/log.config');

var _log2 = _interopRequireDefault(_log);

var _utils = require('../utils');

var _mongo = require('./mongo');

var _mongo2 = _interopRequireDefault(_mongo);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default('demo:server');

/**
 * Created by Atlantismonk on 2017/2/25.
 */

_configs2.default.isDebug = process.env.NODE_ENV === 'debug';
_configs2.default.isDev = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV === 'development';
_configs2.default.isTest = process.env.NODE_ENV === 'test';
_configs2.default.isProduction = process.env.NODE_ENV === 'production';
global._args = _configs2.default; //导入全局变量
console.log('process.env.NODE_ENV=' + process.env.NODE_ENV);

/**
 * 初始化log相关目录
 */
(function () {
    //创建log的根目录'logs'
    if (_log2.default.baseLogPath) {
        (0, _utils.confirmPath)(_log2.default.baseLogPath);
        //根据不同的logType创建不同的文件目录
        for (var i = 0, len = _log2.default.appenders.length; i < len; i++) {
            if (_log2.default.appenders[i].path) {
                (0, _utils.confirmPath)(_log2.default.baseLogPath + _log2.default.appenders[i].path);
            }
        }
    }
})();

//运行连接mongo代码

(0, _mongo2.default)();

/**
 * 项目入口
 */

// 打印输出端口号
// 将端口号设置为配置文件的端口号，默认值为3000
var port = normalizePort(_configs2.default.port || '3000');
console.log('port = ' + port);

/**
 * Create HTTP server.
 */

var server = _http2.default.createServer(_app2.default.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
//# sourceMappingURL=www.js.map