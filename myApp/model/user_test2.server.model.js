/**
 * Created by bll on 16/5/17.
 */
var mongoose=require("mongoose");
var user2Schema=new mongoose.Schema({
    user:{
        type:String,
        default:"pzl",
        unique:true
    },
    username:{
        type:String,
        validate:function(username){
            return username.length>=3;
        }
    },
    isbn:Number,
    phone:{
        type:String,
        match: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
        required:true
    },
    count:{
        type:Number,
        required:true,
        max:1000,
        min:100
    },
    status:{
        type:String,
        enum:['created','doing','success','failed']
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    rehTime:{
        type:Date,
        default:Date.now()
    },
    blog:{
        type:String,
        index:true,
        set:function(url){
            if(!url) return url;
            if(0!==url.indexOf("http://") && 0!==url.indexOf("https://"))
                url="http://"+url;
            return url;
        },
        get:function(url){
            if(!url) return url;
            if(0!==url.indexOf("http://") && 0!==url.indexOf("https://"))
                url="https://"+url;
            return url;
        }
    }
});
var news=new mongoose.Schema({
    title:String,
    author:{
        type:mongoose.Schema.ObjectId,
        ref:"Account"
    }
});

user2Schema.set('toJSON',{getters:true,virtual:true}); //将虚拟属性Json显示
user2Schema.virtual("fullName").get(function(){ //创建虚拟字段并返回
    return this.firstName+""+this.lastName;
});

user2Schema.statics.findByISBN=function(isbn,fn){  //模型方法
    this.findOne({isbn:isbn},function(err,doc){
        fn(err,doc);
    })
};

/*
* 中间件
* */
user2Schema.post('save',function(next){
    console.log('已经执行了save操作!!');
});
user2Schema.pre('save',function(next){
    console.log('即将执行save操作!!');
    next();
});

user2Schema.methods.print=function(){
    console.log('这是实例方法!!');
};
var UserTwo=mongoose.model('Account_test',user2Schema);
var News=mongoose.model('News',news);


