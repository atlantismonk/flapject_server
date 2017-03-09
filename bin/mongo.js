
/**
 * Created by Atlantismonk on 2017/2/19.
 *
 */

import mongoose from 'mongoose';

export default function () {
    mongoose.Promise = global.Promise; /*mongoose有个自带的Promise实现mpromise,但已弃用;所以给mongoose赋值Node自带的Promise*/
    mongoose.connect(_args.mongodb_url);

    mongoose.set('debug', _args.isProduction);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (cb) {
        console.log("Database connect success!yay~\n");
    });
};
