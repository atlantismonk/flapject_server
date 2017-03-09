'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Logger = undefined;

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _log = require('../config/log.configs');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//加载配置文件
/**
 * Created by Atlantismonk on 2017/2/25.
 */

_log4js2.default.configure(_log2.default);

var Logger = {};

var errorLogger = _log4js2.default.getLogger('errorLogger');
var resLogger = _log4js2.default.getLogger('resLogger');

//封装错误日志
Logger.error = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};

//封装响应日志
Logger.response = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};

//格式化响应日志
function formatRes(ctx, resTime) {
    var logText = new String();

    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    //添加请求日志
    logText += formatReq(ctx.request, resTime);

    //响应状态码
    logText += "response status: " + ctx.status + "\n";

    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    //响应日志结束
    logText += "*************** response log end ***************" + "\n";

    return logText;
}

//格式化错误日志
function formatError(ctx, err, resTime) {
    var logText = new String();

    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    //添加请求日志
    logText += formatReq(ctx.request, resTime);

    //错误名称
    logText += "err name: " + err.name + "\n";
    //错误信息
    logText += "err message: " + err.message + "\n";
    //错误详情
    logText += "err stack: " + err.stack + "\n";

    //错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
}

//格式化请求日志
function formatReq(req, resTime) {

    var logText = new String();

    var method = req.method;
    //访问方法
    logText += "request method: " + method + "\n";

    //请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\n";

    //客户端ip
    logText += "request client ip:  " + req.ip + "\n";

    //请求参数
    if (method === 'GET') {
        logText += "request query:  " + JSON.stringify(req.query) + "\n";
        // startTime = req.query.requestStartTime;
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
        // startTime = req.body.requestStartTime;
    }
    //服务器响应时间
    logText += "response time: " + resTime + "\n";

    return logText;
}

exports.Logger = Logger;
//# sourceMappingURL=log_util.js.map