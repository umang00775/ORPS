const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Models
// const LoginUser = require('./models/Login');
const User = require('./models/User');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://Umang:umangrathod@cluster0.82xeogi.mongodb.net/ORPS", {useNewUrlParser :true});

app.get('/',(req,res)=>{
    res.render('home.ejs');
});

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + "/static/login.html");
});

app.get('/signup', (req,res)=>{
    res.sendFile(__dirname + "/static/signup.html");
});

app.get('/login_user', (req, res)=>{
    const data = {
        password:String(req.body.password),
        email: String(req.body.email),
    }
    User.findOne({email:data.email}, (err, result)=>{
        if(!err){
            if(result != null){
                if(result.password === data.password){
                    res.render('LoggedinHome.ejs')
                }
                else{
                    res.send("WRONG_PASSWORD");
                }
            }
            else{
                res.send("EXISTANCE_ERROR")
            }
        }
        else{
            res.send("INTERNAL_ERROR");
        }
    });
});

app.post('/signup_user', (req, res)=>{
    const NewUser = new User({
        name: req.body.name,
        password:req.body.password,
        email: req.body.email
    });
    if(NewUser.save()){
        console.log(NewUser);
    }
    res.render('LoggedinHome.ejs');
});

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})