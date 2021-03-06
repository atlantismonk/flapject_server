#!/usr/bin/env node
"use strict";

/**
 * Created by Atlantismonk on 2017/2/23.
 */
/**
 * index.js是为了配合babel才建得壳文件
 *
 *
 * Babel默认只转换新的JavaScript句法（syntax），而不转换新的API
 *
 * 这里也对package.json中开发环境得模块说明一下
 * "devDependencies": {
 *   "babel-plugin-transform-es2015-destructuring": "^6.23.0",    babel插件: （支持 赋值解构）
 *   "babel-plugin-transform-es2015-modules-commonjs": "^6.23.0", babel插件:（将 ES6 模块标准 转换成 Node.js 用的 CMD 模块标准）   就是让babel只转码import,export特性
 *   "babel-plugin-transform-es2015-parameters": "^6.23.0", babel插件:（支持默认参数， 参数解构， 以及其他参数）
 *   "babel-plugin-transform-es2015-spread": "^6.22.0", babel插件:（支持 ES6 的 spread 操作符）
 *   "babel-plugin-transform-strict-mode": "^6.22.0", babel插件:（由于很多 ES 特性需要 严格模式才能打开， 添加这个插件就会自动在所有文件上添加 'use strict';）
 *   "babel-polyfill": "^6.23.0", 补全babel中还未支持的es6 API
 *   "babel-preset-es2015": "^6.22.0",  es6语法规则
 *   "babel-preset-stage-2": "^6.22.0", es7提案第二阶段的语法规则
 *   "babel-register": "^6.23.0",   改写require命令，连带式的转码被引入的模块
 *   "jscrambler": "^1.1.2" js混淆工具
 * },
 *
 */

/*
 * babel-register模块改写require命令，为它加上一个钩子。
 * 此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。
 * 需要注意的是，babel-register只会对require命令加载的文件转码，而不会对当前文件转码。
 * 另外，由于它是实时转码，所以只适合在开发环境使用。
 *
 * 这种方法并不适合正式产品环境使用。
 * 直接部署用此方式编译的代码不是好的做法。
 * 在部署之前预先编译会更好。
 * 不过用在构建脚本或是其他本地运行的脚本中是非常合适的。
 *
 * 这样做可以把 Babel 注册到 Node 的模块系统中并开始编译其中 require 的所有文件。
 */
require("babel-register");

/*
 * Babel默认只转换新的JavaScript句法（syntax），
 * 而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象
 * ，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
 *
 * 所以为了使babel更好支持ES6要在入口文件引入babel-polyfill
 */
require("babel-polyfill");

//当node全面支持ES6特性时，直接使用app.js即可
require("./www");
//# sourceMappingURL=dev.js.map