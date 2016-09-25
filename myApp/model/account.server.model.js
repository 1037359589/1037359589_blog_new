/**
 * Created by bll on 16/6/8.
 */
var mongoose=require("mongoose");
var autoIncrement = require('mongoose-auto-increment');   //自增ID 模块
autoIncrement.initialize(mongoose.connection);
var accountSchema=new mongoose.Schema({
    uid:{
        type:Number,
        index:true
    },
    username:{
        type:String,
        unique:true
    },
    sex:{
        type:String,
        enum:['男','女','人妖'],
        index:true
    },
    phone:{
        type:String,
        match:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
        required:true,
        index:true
    },
    type:{
        type:Number,
        required:true,
        enum:[0,1,2] //0为超级管理员,1为普通管理员,2为前台用户
    },
    status:{
        type:String,
        default:'in_review',
        enum:['in_review','pass','removed'], //in_review审核中;pass正常;removed已删除
        index:true
    },
    password:{
        type:String
    },
    email:{
        type:String,
        default:"",
        match:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    },
    login_times:{
        type:Number,
        default:0,
        index:true
    },
    recent_login_time:{
        type:Number,
        default:0,
        index:true
    },
    register_time:{
        type:Number,
        default:0,
        index:true
    }
});

accountSchema.post('save',function(next){
    console.log('已经执行了save操作!!');
});
accountSchema.pre('save',function(next){
    console.log('即将执行save操作!!');
    next();
});
accountSchema.plugin(autoIncrement.plugin, {
    model: 'Account',   //数据模块，需要跟同名 x.model("Books", BooksSchema);
    field: 'uid',     //字段名
    startAt: 0,    //开始位置，自定义
    incrementBy: 1    //每次自增数量
});
var account=mongoose.model('Account',accountSchema);

