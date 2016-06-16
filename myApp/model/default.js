/**
 * Created by bll on 16/5/17.
 */
var  mongoose=require('mongoose');
mongoose.connect("mongodb://localhost");
var userSchema=new  mongoose.Schema({
    nickname:{
        type:String,
        default:"new user",
        trim:true
    },
    regTime:{
        type:Date,
        default:Date.now()
    }
});

var User=mongoose.model('User',userSchema);


