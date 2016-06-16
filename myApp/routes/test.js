/**
 * Created by bll on 16/5/17.
 */
var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');
var User=mongoose.model('User');


router.get("/data",function(req,res,err){
    console.log(21312);
    var user=new User({
        uid:"1",
        username:"Sid"
    });
    user.save(function(err,next){
        if(err){
            res.end("Error");
            return next();
        }
        User.find({},function(err,doc){
            if(err){
                res.end('Error');
                return next();
            }
            res.json(doc);
        })
    })
});

var Account=mongoose.model('Account_test');
var News=mongoose.model('News');

router.get("/default",function(req,res,err){
    var acc=new Account({
        nickname:"     pzl     ",
        blog:"www.yunspace.com.cn",
        firstName:"小",
        lastName:"胖子",
        username:"么么哒呵呵",
        isbn:12138,
        count:400,
        status:'doing',
        phone:'15002114175'
    });
    var news=new News({
        title:"我是小胖子",
        author:acc
    });
    console.log('fullName:'+acc.fullName);
    console.log("JSON:"+JSON.stringify(acc));
    acc.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log(acc.blog);
        news.save(function(err){
            if(err){
                console.log('save failed'+err);
            }
            News.findOne().populate('author').exec(function(err,doc){
                console.log('after populate:',err,doc);
            });
        });
        Account.findByISBN(12138,function(err,doc){
            console.log(err,doc,12138);
        });
        acc.print();
        Account.find({},function(err,doc){
            if(err){
                res.end('Error');
                return next();
            }
            res.json(doc,1);
        });
    });
});
module.exports = router;
