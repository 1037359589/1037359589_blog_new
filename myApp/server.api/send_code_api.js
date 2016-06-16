var TopClient = require( '../config/topClient' ).TopClient;
var client = new TopClient({
    'appkey' : '23386800' ,
    'appsecret' : '81987f27d28bcd93bbddbad5274fec48' ,
    'REST_URL' : ' http://gw.api.taobao.com/router/rest '
});

function  send_code_api(){
    /*
    * 设置验证码
    * */
    this.setCode=function(){
        var chars = ['0','1','2','3','4','5','6','7','8','9'];
        var code = "";
        for(var i = 0; i < 6 ; i ++) {
            var id = Math.floor(Math.random()*10);
            code += chars[id];
        }
       return code;
    };
    /*
    * 发送验证码
    * */
    this.sendCode=function(req,res,next){
        var code=this.setCode();
        console.log(code,req.body);
        client.execute( 'alibaba.aliqin.fc.sms.num.send' , {
            'extend' : '123456',
            'sms_type' : 'normal' ,
            'sms_free_sign_name' : '屌丝管你台' ,
            'sms_param' : '{\"name\":\"123456\"}' ,
            'rec_num' : '15002114175',
            'sms_template_code' : "SMS_10690348"
        }, function(error, response) {
            //if (error) {
            //    console.log(error);
            //    res.json({status: "0", session: req.session,data:{}, msg: error});
            //    return;
            //}
            //else {
            //    res.json({status: "1", session: req.session,data:response, msg: '发送成功'});
            //}
            if(!error)
                console.log(response);
            else
                console.log(error);
        });
    }
}


module.exports=send_code_api;
