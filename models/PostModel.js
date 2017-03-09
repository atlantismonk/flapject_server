/**
 * Created by Atlantismonk on 2017/2/14.
 * 博文
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    id: Schema.Types.ObjectId,
    title: String,
    tid: {
        type:String,
        index:true
    }, //todo 不确定什么类型
    content: {
        islong: Boolean, //0短，1长
        type: {
            type: Number,
            default: 0
        }, //0纯文本，1图文，2链文，3音文，4视频文
        txt: String, //文本
        sub: Buffer },
    isdraft: Boolean, //0否，1是
    pv: {
        type: Number,
        default: 0
    },
    nice: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: { //创建时间
            type: Date,
            default: Date.now()
        },
        updateAt: { //更新时间
            type: Date,
            default: Date.now()
        }
    }
},{
    autoIndex:false
    // collection:'post'
});

PostSchema.pre('save',function(next) {
    let now = Date.now();
    if(this.isNew) this.meta = {createAt:now,updateAt:now};
    else this.meta = {updateAt : now};
    next();
});

PostSchema.statics = {
    fetch: function (cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function (id,cb) {
        return this.findOne({ id: id }).exec(cb);
    }
};

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;