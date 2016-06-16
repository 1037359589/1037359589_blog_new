/**
 * Created by bll on 16/6/8.
 */
var Router=require('express').Router();
var mongoose=require('mongoose');

var Account=mongoose.model('Account');

Router.get('/account',function(req,res,err){
        var account=new Account({
            username:"泡泡oO水流2",
            password:"919927",
            sex:'男',
            phone:"15002114175",
            type:0,
            status:"in_review",
            email:'1037359589@qq.com',
            login_times:0,
            recent_login_time:1442728394,
            register_time:1442729876
        });
        account.save(function(err,next){
            if(err){
                console.log("Error");
                return next();
            }
            Account.find({},function(err,doc){
                if(err){
                    console.log('Error');
                    return next();
                }
                res.json(doc);
            });
            //Account.where({ uid: 1 }).update({$set:{ username: '泡泡oO水流DIY' }},function(){
            //    console.log('已经更新');
            //});

        });
});
Router.get('/remove',function(req,res,err){
    Account.remove({uid:1},function(err,docs){//删除id为4的记录
        res.end('removed:'+docs);
    });
});

module.exports = Router;