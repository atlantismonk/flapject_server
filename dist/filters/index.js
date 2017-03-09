'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by Atlantismonk on 2017/2/14.
 * 过滤器管理器
 */

/*登入判断过滤*/
var auth = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (ctx.session.token) {
                            ctx.body = '登入成功';
                            ctx.status = 202; //已存在，登入成功
                        }
                        _context.next = 3;
                        return next();

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function auth(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = { auth: auth };
//# sourceMappingURL=dev.js.map