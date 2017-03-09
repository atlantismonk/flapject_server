/**
 * Created by Atlantismonk on 2017/2/25.
 */

import fs from 'fs';

class Utils {
    /**
     * 确定目录是否存在，如果不存在则创建目录
     */
    confirmPath(pathStr) {
        console.log('test');
        if (!fs.existsSync(pathStr)) {
            fs.mkdirSync(pathStr);
            console.log('create path: ' + pathStr);
        }
    }
}

/**
 * 确定目录是否存在，如果不存在则创建目录
 */
function confirmPath(pathStr) {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
        console.log('create path: ' + pathStr);
    }
}


export {confirmPath};