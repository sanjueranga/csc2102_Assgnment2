const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const { redirect } = require("express/lib/response");



//database connection
const mongoose = require('mongoose');


mongoose.set('strictQuery', false);
// mongoose.connect("mongodb://localhost:27017/votingAppDB", { useNewUrlParser: true });
// gDuX85wF5mX9uxec
const conn_str = "mongodb+srv://sanjueranga:A8D0iBJyKqXgTtYy@cluster0.rl958vp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(
conn_str,
{ 
useNewUrlParser: true, 
useUnifiedTopology: true 
},(err) => {
if (err) {
console.log("error in connection");
} else {
console.log("mongodb is connected");
}});


//creating users and votes schemas

const userSchema ={

  NIC:String,
  password: String
}

const voteSchema={
  NIC: String,
  party: String,
  vote1: String,
  vote2: String,
  Vote3: String
}

const User = mongoose.model("User",userSchema);
const Vote = mongoose.model("vote",voteSchema);





//app
const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    
   res.render("home")

  });

  app.use(express.static(__dirname + '/public'));

app.get("/login",function(req,res){
    
  res.render("login")
 
  });

  app.get("/vote",function(req,res){
    
    res.render("vote",{status:"you can't vote,please login"});
   
    });
  


app.post("/register",function(req,res){

  const newUser = new User({
    NIC: req.body.NIC,
    password: req.body.password
  });

  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/")
    }
  });
})











   app.get("/register",function(req,res){
    
    res.render("register")
 
   })

  app.post("/login",function(req,res){
    const NIC  = req.body.NIC;
    const password = req.body.password;

    User.findOne({NIC:NIC},function(err,foundUser){
      if(err){
        console.log(err);
      }else{
        if(foundUser){
          if(foundUser.password === password){
            
            res.render("vote",{status:"you can vote"});
          }else{
            res.render("vote",{status:"wrong password"});
          }
        }else{
          res.render("vote",{status:"you can't vote,please login"});
        }
      }
    })
  })


  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 3000;
  }
  
  app.listen(port,function(){
    console.log("server has started successfully");
  })

   



