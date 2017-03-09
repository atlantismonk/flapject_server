'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Atlantismonk on 2017/2/25.
 */

var AdminController = function () {
    function AdminController() {
        _classCallCheck(this, AdminController);
    }

    _createClass(AdminController, [{
        key: 'showConfiguration',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _models.Config.fetch(function (err, configs) {
                                    if (err) ctx.throw(err);
                                    ctx.body = configs;
                                });

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function showConfiguration(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return showConfiguration;
        }()
    }]);

    return AdminController;
}();
//# sourceMappingURL=admin_controller.js.map