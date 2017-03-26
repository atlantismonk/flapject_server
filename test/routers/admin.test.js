/**
 * Created by Atlantismonk on 2017/2/20.
 */
import app from '../../app';
import supertest from 'supertest';
const request = supertest(app);


describe('admin router test', function () {
    it('get all configuration',function(done){
       request.get('/admin')
           .exepret(200,(res)=>{
               // res.request.body
           },done)
    });
});