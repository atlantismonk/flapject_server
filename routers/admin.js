/**
 * Created by Atlantismonk on 2017/2/14.
 * 管理员
 */
import Router from 'koa-router'
import admin_controller from '../controller/admin_controller'


/**
 * 管理业务路由
 * @type {Router}
 */
const admin = new Router({
    prefix:'/admin'
});
admin
    .get('/',admin_controller.show)
    .post('/',admin_controller.init)
    .put('/',admin_controller.updValueByKey)
    .post('/sign',admin_controller.signIn)
    .del('/sign',admin_controller.signOut)
    .put('/sign',admin_controller.updPassword);



export default admin;


