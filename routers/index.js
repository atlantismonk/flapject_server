/**
 * Created by Atlantismonk on 2017/2/14.
 * 路由管理模块
 * 将原本写在 app.js 的路由全部集合到这个文件统一管理
 */
import post from './post';
import tabree from './tabree';
import admin from './admin';

import filters from '../filters';

export default (app) => {

    post.use('/', filters.auth);//todo path参数用正则写，要排除登入登出两个接口

    app.use(post.routes());
    app.use(post.allowedMethods());

    app.use(tabree.routes());
    app.use(tabree.allowedMethods());

    app.use(admin.routes());
    app.use(admin.allowedMethods());

    return app;
};