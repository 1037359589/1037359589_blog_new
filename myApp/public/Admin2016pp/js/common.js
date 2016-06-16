/**
 * Created by bll on 16/6/14.
 */
//export var firstName = 'Michael';
var globalObj={
    user:"",
    getNowTime:function(){
        return Date.parse(new Date());
    },
    setSession:function(req,res,doc){
        this.user=doc==undefined||""?this.user:doc;
        if((req.session.user==""||req.session.user==undefined)&&req.path!="/admin_login"&&req.path!="/login"){
            res.redirect("/admin2016pp/login");
            return;
        }
        req.session.user = doc||this.user;
        var hour = 360000;
        req.session.cookie.expires = new Date(Date.now() + hour);
        req.session.cookie.maxAge = hour;
    },
    timeIntToTimeString:function(time){
        var myDate = new Date(parseInt(time));
        return {
            Y:myDate.getFullYear(), //获取完整的年份(4位,1970-????)
            M:myDate.getMonth()+1,
            D:myDate.getDate(),
            W:myDate.getDate(),
            h:myDate.getHours(),       //获取当前小时数(0-23)
            m:myDate.getMinutes(),   //获取当前分钟数(0-59)
            s:myDate.getSeconds()
        }
    },
    getUnixTime:function (dateStr) {
        var newstr = dateStr.replace(/-/g,'/');
        var date =  new Date(newstr);
        var time_str = date.getTime().toString();
        return time_str.substr(0, 10);
    }
};
module.exports=globalObj;




