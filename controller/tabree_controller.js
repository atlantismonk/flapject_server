import {Tabree} from '../models';

/**
 * Created by Atlantismonk on 2017/3/6.
 */

class TabreeController{

    /**
     * 获取所有标签
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async findAll(ctx,next){
        await Tabree.findChildren(0, (err, tabs) => {
            if (err) ctx.throw(err);

            ctx.body = tabs;
        })
    }


    /**
     * 创建新标签
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async create(ctx,next){
        let pid = ctx.request.body.pid || 0,
            index = ctx.request.body.index || 0,
            model = ctx.request.body.model || 0,
            name = ctx.request.body.name,
            alias = ctx.request.body.alias,
            remark = ctx.request.body.remark;

        await Tabree.create({
            pid,
            index,
            model,
            name,
            alias,
            remark,
        }, (err, tabree) => {
            if (err) ctx.throw(err);

            ctx.body = '创建成功';
        });
    }


    /**
     * 获取指定标签
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async get(ctx,next){
        await Tabree.findChildren(ctx.params.tid, (err, tabs) => {
            if (err) ctx.throw(err);

            ctx.body = tabs;
        });
    }


    /**
     * 删除指定标签
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async del(ctx,next){
        await Tabree.remove({id: ctx.params.tid}, (err, tab) => {
            if (err) ctx.throw(err);

            ctx.body = '删除成功';
        });
    }


    /**
     * 修改指定标签
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async upd(ctx,next){
        let pid = ctx.request.body.pid,
            index = ctx.request.body.index || 0,
            name = ctx.request.body.name,
            alias = ctx.request.body.alias,
            remark = ctx.request.body.remark;

        let t = JSON.parse('{' +
            (!pid ? '' : '"' + pid + '",') +
            (!index ? '' : '"' + index + '",') +
            (!name ? '' : '"' + name + '",') +
            (!alias ? '' : '"' + alias + '",') +
            (!remark ? '' : '"' + remark + '",') +
            '"meta":{"updateAt":"' + Date.now() + '"}}');

        await Tabree.update({id: ctx.params.tid}, t, (err, tab) => {
            if (err) ctx.throw(err);

            ctx.body = '修改成功';
        });
    }
}