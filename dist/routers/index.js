'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

var _tabree = require('./tabree');

var _tabree2 = _interopRequireDefault(_tabree);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _filters = require('../filters');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Atlantismonk on 2017/2/14.
 * 路由管理模块
 * 将原本写在 app.js 的路由全部集合到这个文件统一管理
 */
exports.default = function (app) {

    _post2.default.use('/', _filters2.default.auth); //todo path参数用正则写，要排除登入登出两个接口

    app.use(_post2.default.routes());
    app.use(_post2.default.allowedMethods());

    app.use(_tabree2.default.routes());
    app.use(_tabree2.default.allowedMethods());

    app.use(_admin2.default.routes());
    app.use(_admin2.default.allowedMethods());

    return app;
};
//# sourceMappingURL=index.js.map