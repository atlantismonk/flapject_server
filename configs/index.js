/**
 * Created by Atlantismonk on 2017/2/25.
 */

import dev_args from './dev.config.json';
import pro_args from './production.config.json';


export default {
    development: dev_args,
    production: pro_args
}[process.env.NODE_ENV || 'development'];