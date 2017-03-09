/**
 * Created by Atlantismonk on 2017/2/14.
 */
import Router from 'koa-router';

import tabtree_controller from '../controller/tabree_controller';

const router = new Router({
    prefix: '/tabree'
});

router
    .get('/', tabtree_controller.findAll)
    .post('/', tabtree_controller.create)
    .get('/:tid', tabtree_controller.get)
    .del('/:tid', tabtree_controller.del)
    .put('/:tid', tabtree_controller.upd);

export default router;