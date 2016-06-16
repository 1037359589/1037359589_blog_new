/**
 * Created by bll on 16/5/17.
 */
var mongoose=require('mongoose');
var config=require('./config.js');
module.exports=function(){
    var db=mongoose.connect(config.mongodb);
    require("../model/user.server.model.js");
    require("../model/user_test2.server.model.js");
    require("../model/account.server.model.js");
    return db;
};