var express = require('express');
var router = express.Router();
var js="http://localhost:3000/blog/js";

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('Blog/index.html', { title: 'Express'});
});
router.get('/vue', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('Blog/test/vue.html', { title: 'Express',js:js});
});
router.get("/login",function(req,res,next){
  res.render('Admin/login/login', { title: 'Express'});
});

module.exports = router;
