/**
 * Created by Atlantismonk on 2017/2/20.
 */
import {Config} from '../../models';
import mongo from '../../bin/mongo';


describe('Config模块', () => {
    before(function () {//在本区块的所有测试用例之前执行
        mongo();
    });
    it('添加成功打印配置信息', () => {
        Config.create({
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
        },function (err,config) {
            if (err) throw err;

            console.log('json:' + config);
        
            done();
        });
    });

    it('检索所有配置信息',(done) => {
        Config.fetch(function (err, configs) {
            console.log(configs.length);
            done();
        });
    });
});
