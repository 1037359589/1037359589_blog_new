/**
 * Created by bll on 16/6/8.
 */
var Router=require('express').Router();
var mongoose=require('mongoose');
var crypto=require('crypto');
var Account=mongoose.model('Account');
var gf=require("../global_obj");
var url = require('url');
//var global_session=require("../config/global_session");
function Account_Center(){
    this.sqlObj="";
    /*
    * 对象实例化
    * */
    this.getInstance=function(data){
        var d=data||"";
        this.sqlObj=new Account(d);
    };
    /*
    * 管理员注册
    * */
    this.adminRegister=function(req,res,next){
        var type="2";
        if(req.originalUrl.indexOf("admin2016pp")>-1){
            type=1;
        }
        var hasher=crypto.createHash("md5");
        hasher.update(req.body.passwd);
        var password=hasher.digest('hex');
        var data={
            username:req.body.name,
            password:password,
            phone:"15002114175",
            type:type,
            status:"in_review",
            register_time:gf.getNowTime(),
        };
        console.log(data);
        this.getInstance(data);
        this.sqlObj.save(function(err,next){
            if(err){
                res.json({status:"0",data:{},msg:err});
                return;
            }
            res.json({status:"1",data:data,msg:'成功'});
        });
    };
    /*
     * 检测用户名是否存在
     * */
    this.adminIsSet=function(req,res,next){
        var request={
            username:req.body.username
        };
        this.checkPhoneOrAdmin(request,res);
    };
    /*
    * 检查手机号码是否已经存在
    * */
    this.isSetPhone=function(req,res,next){
        var request={
            phone:req.body.phone
        };
        this.checkPhoneOrAdmin(request,res);
    };
    this.checkPhoneOrAdmin=function(request,res){
        Account.find(request,function(err,doc){
            if(err){
                res.json({status:"0",data:{},msg:err});
                return next();
            }
            res.json({status: "1", data: doc, msg: '查询成功'});
        });
    };
    /*
    * 管理员登陆
    * */
    this.handleLogin=function(req,res,next){
        var hasher=crypto.createHash("md5");
        hasher.update(req.body.password);
        var password=hasher.digest('hex');
        var type=[ '0', '1'];
        var request={
            username:req.body.username,
            password:password,
            status:'pass',
            type:{$in: type}
        };
        //Account.find(request,function(err,doc){
        //    if(err){
        //        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        //        res.write("ERROR:"+err);
        //        return;
        //    }
            Account.find(request,function(err,doc){
                if(err){
                    res.json({status:"0",data:{},msg:err});
                    return next();
                }
                var currentTime=Date.parse(new Date());
                Account.update({username:req.body.username}, {
                    $set: {recent_login_time:currentTime}
                }, function(err) {
                    if(err){
                        console.log(err);
                        return
                    }
                    gf.setSession(req,res,doc);
                    console.log(req.session,2);
                    res.json({status: "1", session: req.session,data:doc, msg: '查询成功'});
                });
            });
        //});
    };
    /*
    * 显示正常用户数据
    * */
    this.handleUserPassList=function(req,res,next){
        this.handleFindList('pass',req,res,next);
    };
    /*
     * 显示审核中用户数据
     * */
    this.handleUserInReViewList=function(req,res,next) {
        this.handleFindList('in_review',req,res,next);
    };
    /*
     * 显示已删除的用户数据
     * */
    this.handleUserRemovedList=function(req,res,next){
        this.handleFindList('removed',req,res,next);
    };
    this.handleFindList=function(status,req,res,next){
        var type;
        if(parseInt(req.body.type)>2){
                return ;
        }
        if(req.body.type=="1"){
            type=[ '0', ''+req.body.type ]
        }else{
            type=[''+req.body.type ]
        }
        var request={
            type:{$in: type},
            status:status
        };
        Account.find(request,function(err,doc){
            if(err){
                res.json({status: "0", data:{},session:req.session ,msg: err});
                return;
            }
            console.log(req.session,2);
            res.json({status: "1", data:doc,session:req.session ,msg: '查询成功'});
        });
    };
    /*
    * 审核通过
    * */
    this.handlePass=function(req,res,next){
        this.handleDo('pass',req,res,next);
    };
    /*
     * 删除用户
     * */
    this.handleRemove=function(req,res,next){
        this.handleDo('removed',req,res,next);
    };
    /*
    * 处理用户操作
    * */
    this.handleDo=function(handleType,req,res,next){
        Account.update({uid:req.body.uid}, {
            $set: {status:handleType}
        }, function(err,doc) {
            if(err){
                console.log(err);
                return
            }
            console.log(req.session,2);
            res.json({status: "1", session: req.session,data:doc, msg: '查询成功'});
        });
    }
}
module.exports=Account_Center;
