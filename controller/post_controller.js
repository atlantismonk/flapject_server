import {Post} from '../models';

/**
 * Created by Atlantismonk on 2017/3/6.
 */


class PostController{
    constructor(){

    }

    /**
     * 获取所有文章
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async findAll(ctx, next){
        await Post.fetch((err, posts) => {
            if(err) ctx.throw(err);
            ctx.body = posts;
        });
    }


    /**
     * 创建新文章
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async create(ctx, next){
        let title = ctx.request.body.title,
            ttid = ctx.request.body.ttid,
            type = ctx.request.body.type,
            txt = ctx.request.body.txt,
            buf = ctx.request.body.sub,//上传的图片或视频...
            isdraft = ctx.request.body.isdraft;


        let wlimit;
        await Config.findDef((err, config) => {
            if(err) ctx.throw(err);
            wlimit = config.wordsLimit;
        });

        await Post.create({
            title,
            ttid,
            content:{
                isLong:txt.length>wlimit,
                type,
                txt,
                sub:buf
            },
            isdraft
        },(err,post) => {
            if(err) ctx.throw(err);
            ctx.body = '创建成功';
        });
    }


    /**
     * 获得指定文章
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async get(ctx, next){
        await Post.findOne({id:ctx.params.pid},(err,post) => {
            if(err) ctx.throw(err);
            ctx.body = post?post:'找不到文章';
        });
    }


    /**
     * 删除指定文章
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async del(ctx, next){
        await Post.remove({id:ctx.params.pid},(err,post) => {
            if(err) ctx.throw(err);

            ctx.body = '删除成功';
        });
    }


    /**
     * 修改指定文章
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async upd(ctx, next){
        let title = ctx.request.body.title,
            ttid = ctx.request.body.ttid,
            type = ctx.request.body.type,
            txt = ctx.request.body.txt,
            buf = ctx.request.body.sub,//上传的图片或视频...
            isdraft = ctx.request.body.isdraft;

        let wlimit;
        await Config.findDef((err, config) => {
            if(err) ctx.throw(err);
            wlimit = config.wordsLimit;
        });


        await Post.update({id:ctx.params.pid},{
            title,
            ttid,
            content:{
                isLong:txt.length>wlimit,
                type,
                txt,
                sub:buf
            },
            isdraft
        },(err,post) => {
            if(err) ctx.throw(err);

            ctx.body = '修改成功';
        });
    }

}

let post;
export default function () {
    if (!post)
        post = new PostController();

    return post;
};