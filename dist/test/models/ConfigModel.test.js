'use strict';

var _models = require('../../models');

var _mongo = require('../../bin/mongo');

var _mongo2 = _interopRequireDefault(_mongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Atlantismonk on 2017/2/20.
 */
describe('Config模块', function () {
    before(function () {
        //在本区块的所有测试用例之前执行
        (0, _mongo2.default)();
    });
    it('添加成功打印配置信息', function () {
        _models.Config.create({
            blogName: 'Atlantismonk',
            user: {
                name: 'am',
                passwd: 'am',
                email: 'atlantismonk.y@gmail.com'
            },
            page: {
                itemNum: 20
            },
            post: {
                wordsLimit: 100
            }
        }, function (err, config) {
            if (err) throw err;

            console.log('json:' + config);

            done();
        });
    });

    it('检索所有配置信息', function (done) {
        _models.Config.fetch(function (err, configs) {
            console.log(configs.length);
            done();
        });
    });
});
//# sourceMappingURL=ConfigModel.test.js.map