/**
 * Created by Atlantismonk on 2017/2/14.
 * 配置
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ConfigSchema = new Schema({
    blogName: String,
    user: {
        name: String,
        passwd: String,
        email: String,
        intro: { //简介
            type: String,
            max: 200
        },
        about: {
            type: String,
            max: 1000
        }
    },
    page: {
        itemNum: {
            type: Number,
            default: 20
        }
    },
    tabree:{
        loadLevel:{
          type:Number,
          default:3,
          min:1,
          max:10
        },
        loadNum:{
            type:Number,
            default:10,
            min:1
        }
    },
    post: {
        wordsLimit: {
            type: Number,
            default: 500
        }
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
    // collection:'configs' //自定义collection的名字，默认将mongoose.model('Config', ConfigSchema);中"Config"转为小写并追加上复数"s":"configs"
});

ConfigSchema.pre('save',function (next){
    let now = Date.now();
    if(this.isNew) this.meta = {createAt:now,updateAt:now};
    else this.meta = {updateAt : now};
    next();
});

ConfigSchema.statics = {
    fetch: function (cb) {
        return this.model('Config').find({}).sort('meta.updateAt').exec(cb);
    },
    findDef: function (cb) {
        return this.model('Config').find({}).limit(1).exec((err, configs) => {
            cb(err, configs[0]);
        });
    },
    updateArg: function (id,arg,val, cb) {
        let query = JSON.parse('{"'+arg+'":"'+val+'"}');
        return this.model('Config').update({_id:id},{$set:query}).exec(cb);
    }
};

const ConfigModel = mongoose.model('Config', (ConfigSchema));

export default ConfigModel;