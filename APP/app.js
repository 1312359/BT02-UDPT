var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');

var Strategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var eS = require('express-session');
var user = require('./model/user');

app.listen(3000, function () {
    mongoose.connect('mongodb://localhost/Users');
    console.log('now listening on http://localhost:3000');

})
//mongoose.model('user',{name: String,password: String});
//var ect = require('ect');
//var ectRenderer = ect({ watch: true, root: __dirname + '/views', ext : '.ect' });
//app.set('view engine', 'ect');
//app.engine('ect', ectRenderer.render);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended :false}));
app.use(cookieParser());
app.use(eS({
    secret : process.env.SESSION_SECRET || 'secret',
    resave :false,
    saveUninitialized : false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy(function(username,password,done){
   //  done(null,user);
   // done(null,null);
   // done(new Error('ouch!'));
    //if(username === password){
      //  done(null,{id:username,name:username});
   // }else{
    //    done(null,null);
   // }
    user.findOne( {email : username, password : password },     function(err, User){

       //console.log(user);
        //console.log(user.password);
        if (err) { return done(err); }
        if ( User != null && User.length == 0) { return done(null, false); }
        return done(null, User);
        //return cb(null, {id : "121212", email: 'asdasd', password:'123123'});
    });
}));
passport.serializeUser(function(user,done){
done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
});
//app.get('/',function(req,res){
   // res.render('index',{
   //     isAuthenticated:false,
        //user:req.user
   // });
//});
//app.get('/login',function(req,res){
  ///  res.render('login');
//});
var routes = require('./routes/index');
app.use('/', routes);
//var user = require('./routes/user');
//app.use('/user', user);
var login = require('./routes/login');
app.get('/login',login);

app.post('/login',passport.authenticate('local'),function(req,res){
   res.redirect('/');
});

app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});
//var newuser = new user({name:'mimi',email:'sa@sa',password:'123456'});
//newuser.save();
app.get('/user',function(req,res){
    mongoose.model('user').find(function(err,user){
        res.send(user);
    })
});
var register = require('./routes/register')
app.get('/register',register);
app.post('/register',register);


