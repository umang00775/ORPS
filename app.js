const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Models
const User = require('./models/User');

// Data to show
const Data = require('./data/Data.js');

// Login or not 
let isLoggedin = false;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://Umang:umangrathod@cluster0.82xeogi.mongodb.net/ORPS", {useNewUrlParser :true});

app.get('/',(req,res)=>{
    if(isLoggedin){
        res.render('home.ejs', {data:Data, length: 6});
    }
    else{
        res.render('LoggedinHome.ejs', {data:Data, length: 6});
    }
    
});

app.get('/loggedIn',(req,res)=>{
    res.render('home.ejs');
});

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + "/static/login.html");
});

app.get('/signup', (req,res)=>{
    res.sendFile(__dirname + "/static/signup.html");
});

app.post('/login_user', (req, res)=>{
    const data = {
        email1:req.body.email,
        password1: req.body.password,
    }
    console.log(data);
    User.findOne({email:data.email1}, (err, result)=>{
        if(!err){
            console.log(result);
            if(result !== null){
                if(result.password === data.password1){
                    isLoggedin = true;
                    res.redirect('/')
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
    isLoggedin = true;
    res.redirect('/');
});

app.get('/uploadarticle',(req,res)=>{
    if (isLoggedin) {
        res.sendFile(__dirname + "/static/UploadArticle.html");
    }
    else{
        res.sendFile(__dirname + "/static/login.html");
    }
});

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})