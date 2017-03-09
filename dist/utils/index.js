'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.confirmPath = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Atlantismonk on 2017/2/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, [{
        key: 'confirmPath',

        /**
         * 确定目录是否存在，如果不存在则创建目录
         */
        value: function confirmPath(pathStr) {
            console.log('test');
            if (!_fs2.default.existsSync(pathStr)) {
                _fs2.default.mkdirSync(pathStr);
                console.log('create path: ' + pathStr);
            }
        }
    }]);

    return Utils;
}();

/**
 * 确定目录是否存在，如果不存在则创建目录
 */


function confirmPath(pathStr) {
    if (!_fs2.default.existsSync(pathStr)) {
        _fs2.default.mkdirSync(pathStr);
        console.log('create path: ' + pathStr);
    }
}

exports.confirmPath = confirmPath;
//# sourceMappingURL=dev.js.map