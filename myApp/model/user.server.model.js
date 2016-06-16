/**
 * Created by bll on 16/5/17.
 */
var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
    uid:Number,
    username:String,
    createTime:Date,
    lastLogin:Date
});
mongoose.model('User',userSchema);
