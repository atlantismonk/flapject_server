/**
 * Created by Atlantismonk on 2017/2/14.
 * Tab Tree 标签树
 * todo 这里应该对树结构模型的设计要考虑清楚
 * 现在使用的是嵌套集合模式
 * 移动一个的牵动就特别大了
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let TabreeSchema = new Schema({
    id:Schema.Types.ObjectId,
    pid:{
        type:String,
        index:true
    },//父id
    index:String,//当前树节点顺序码
    model:{//标签类型，专栏|Tree
        type:Number,
        defatult:0,
    },
    name:{
        type:String,
        max:50,
    },
    alias:{//别名
        type:String,
        default:'',
        max:100,
    },
    sonSum:{//子标签总数
        type:Number,
        default:0,
    },
    postSum:{//博文总数
        type:Number,
        default:0,
    },
    remark:{
        type:String,
        default:'',
        max:500,
    },
    meta:{
        createAt:{
            type:Date,
            default:Date.now(),
        },
        updateAt:{
            type:Date,
            default:Date.now(),
        }
    }
},{
    autoIndex:false
    // collection:'tabree'
});

TabreeSchema.pre('save',function(next) {
    let now = Date.now();
    if(this.isNew) this.meta = {createAt:now,updateAt:now};
    else this.meta = {updateAt : now};
    next();
});

TabreeSchema.statics = {
    fetch:function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById:function(id,cb) {
        return this.findOne({id:id}).exec(cb);
    },
    findChildren:function(parent,cb) {
        // for(let i=0;i<)
        // this.find({pid:parent}).sort({index:1}).
        //todo 遍历几层子标签出来
        return this.find({pid: parent}).sort('meta.createAt').exec(cb);
    }
};

const TabreeModel = mongoose.model('Tabree', TabreeSchema);

export default TabreeModel;