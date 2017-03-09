/**
 * Created by Atlantismonk on 2017/2/14.
 */

import Router from 'koa-router';
import async from 'async';

import post_controller from '../controller/post_controller';

const router = new Router({
    prefix:'/posts'
});

router
    .get('/',post_controller.findAll)
    .post('/',post_controller.create)
    .get('/:pid',post_controller.get)
    .del('/:pid',post_controller.del)
    .put('/:pid',post_controller.upd);

export default router;