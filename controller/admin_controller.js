import crypto from 'crypto';
import {Config} from '../models';
/**
 * Created by Atlantismonk on 2017/2/25.
 */

class AdminController {
    /**
     * 展示配置
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async show(ctx, next) {
        //todo 把fetch()换成findOne()
        await Config.fetch(function (err, configs) {
            if (err) ctx.throw(err);
            ctx.body = configs;
        });
    }



    /**
     * 添加||初始化
     * todo 参数没有正则验证
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async init(ctx, next) {
        let blogName = ctx.request.body.blogname,
            username = ctx.request.body.username,
            passwd = ctx.request.body.passwd,
            pwdagain = ctx.request.body.pwdagain,
            email = ctx.request.body.email;

        if (!(passwd === pwdagain)) {
            ctx.body = '两次密码不同';
            return;
        }

        let length;
        await Config.fetch((err, configs) => {
            length = configs.length;
        });

        if (!length) {
            // 如果没有请求参 且 数据没有配置信息 说明这个请求是询问能不能创建新配置信息的
            if (Object.keys(ctx.request.body).length === 0) {
                ctx.body = '可以创建新配置';
                return;
            }
        } else {
            ctx.body = '不允许创建配置';
            return;
        }

        //MD5加密密码
        let hash = crypto.createHash('md5');
        hash.update(passwd);
        let ciphertext = hash.digest('hex');

        let doc = {
            blogName,
            user: {
                name: username,
                passwd: ciphertext,
                email
            }
        };

        await Config.create(doc, (err, config) => {
            if (!config && err) ctx.throw(err);

            // ctx.body = '初始化成功';
            ctx.body = config;
        });
    }

    /**
     * 修改
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async updValueByKey(ctx, next) {
        let id = ctx.request.body.id,
            arg = ctx.request.body.arg,
            val = ctx.request.body.val;

        await Config.updateArg(id, arg, val, (err, result) => {
            if (err) ctx.throw(err);
            ctx.body = '成功修改' + result.ok + '条记录';
        });
    }



    /**
     * 登入
     *
     * 加密用户信息:
     * ```js
     * let cipher = crypto.createCipheriv('aes-128-ecb',_args.token_key,vi);//这里的token_key必须为16位字符串
     * cipherChunks.push(cipher.update(data,'utf-8','base64'));
     * cipherChunks.push(cipher.final('base64'));
     * ```
     *
     * 将密文作为token标记传到session中:
     * ```js
     * token = cipherChunks.join('');
     * ctx.session.token = token;//todo 把令牌存入数据库以持久化，方便使用
     * ```
     *
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async signIn(ctx, next) {
        let username = ctx.request.body.username || null,
            passwd = ctx.request.body.passwd || null;

        if (!username && !passwd) {
            // ctx.status = 412;//账户或密码为空
            ctx.body = '账户和密码不能为空';
            return;
        }

        await Config.findDef((err, config) => {
            if (err) ctx.throw(err);

            if (!config || !config.user) {
                ctx.body = '尚未配置用户信息';//todo 应该重定向到初始化页面
                return;
            }

            let hash = crypto.createHash('md5');
            hash.update(passwd);
            let ciphertext = hash.digest('hex');
            if (username === config.user.name && config.user.passwd === ciphertext) {

                /**
                 * @param data 用户信息
                 * @param vi  向量,为空就行
                 * @param cipherChunks 存放base64编码的字块数组
                 * @param token 密文令牌
                 */
                let data = JSON.stringify({
                        id: config._id,
                        username: config.name
                    }),
                    vi = '',
                    cipherChunks = [],
                    token = null;

                let cipher = crypto.createCipheriv('aes-128-ecb', _args.token_key, vi);//这里的token_key必须为16位字符串
                cipherChunks.push(cipher.update(data, 'utf-8', 'base64'));
                cipherChunks.push(cipher.final('base64'));
                token = cipherChunks.join('');

                console.log('current user token:' + token);
                ctx.session.token = token;

                ctx.body = '登入成功'
            } else {
                ctx.body = '账户或密码错误';
            }
        });
    }


    /**
     * 登出
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async signOut(ctx,next){
        ctx.session = null;//todo 把数据库中的令牌也删除

        ctx.body = '令牌已注销';
        ctx.status = 401;
    }


    /**
     * 修改密码
     * todo 参数正则验证
     * @param ctx
     * @param next
     * @returns {Promise.<*>}
     */
    async updPassword(ctx,next){
        let id = ctx.request.body.id,
            oldpwd = ctx.request.body.oldpwd,
            newpwd = ctx.request.body.newpwd,
            passwd;

        if(!id) return ctx.body = '缺省ID参数';
        if(oldpwd === newpwd) return ctx.body = '新旧密码不能相同';

        let hash = crypto.createHash('md5');
        hash.update(oldpwd);
        let ciphertext = hash.digest('hex');

        await Config.findDef(async (err,config) => {
            passwd = config.user.passwd;
        });

        if (passwd === ciphertext){//对比旧密码
            let hash2 = crypto.createHash('md5');
            hash2.update(newpwd);
            let ciphertext2 = hash2.digest('hex');
            await Config.updateArg(id, 'user.passwd', ciphertext2, (err, result) => {
                if (err) ctx.throw(err);

                let fb = (!result.ok) ? '密码修改失败' : '密码修改成功';
                (!!result.ok) ?ctx.session = null:'';//todo 把数据库中的令牌也删除

                ctx.body = fb;
            });
        }else{
            ctx.body = '旧密码错误';
        }
    }
}

export default (function () {
    if (!admin)const admin = new AdminController();

    return admin;
});