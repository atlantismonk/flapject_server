/**
 * Created by Atlantismonk on 2017/2/14.
 * 过滤器管理器
 */


/*登入判断过滤*/
const auth = async (ctx,next) => {
    if(ctx.session.token){
        ctx.body = '登入成功';
        ctx.status = 202;//已存在，登入成功
    }
    await next();
};

export default {auth};