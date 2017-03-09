/**
 * Created by Atlantismonk on 2017/1/2.
 * 系统入口
 *
 */

import Koa from 'koa';
import onerror from 'koa-onerror';
import log from 'koa-logger';
import session from 'koa-session';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';

import router from './routers';
import {logUtil} from './utils/log_util';

let app = new Koa();

/**
 * 错误信息
 */
onerror(app);


/**
 * 设置 Cookie 签名密钥
 * session
 */
app.keys = ['secret'];//设置 Cookie 签名密钥
app.use(convert(session(app)));


/**
 * body解析器
 */
app.use(convert(bodyParser));


/**
 * 日志
 */
app.use(convert(log()));
app.use(async (ctx,next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    let ms;
    try {
        //开始进入到下一个中间件
        await next();

        ms = new Date() - start;
        //记录响应日志
        logUtil.response(ctx, ms);

    } catch (err) {

        ms = new Date() - start;
        //记录异常日志
        logUtil.error(ctx, err, ms);
    }
});


/**
 * 路由入口
 */
app = router(app);


app.on('error',function(err,ctx) {
    console.log(err);
    log.error('server error:',err,ctx);
});

export default app;