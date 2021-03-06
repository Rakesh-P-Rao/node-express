///////// EXPRESSJS
// Express is a nodejs backend web framework
// express version 4.x
 

//// to use express
const express = require("express");
// creates an express application express() function is a top level function expoerted by express module
const app = express();
// mongoose 
const mongoose = require("mongoose");
// express handlebars 
const exphbs = require("express-handlebars");
// body parser 
const bodyParser = require("body-parser");

//// Import Profile Schema
require("./views/Model/Profile");
let Profile = mongoose.model("profile");


//// MIDDLEWARE     installation steps for middleware :----    create folder view => create home.handlebars & layout folder => create main.handlebars in layout folder
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//// serve static assests 
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));


//// connect database
let mongodb_url =
    "mongodb+srv://js_fullstack:js_fullstack@cluster0.dqyt4.mongodb.net/js_fullstack?retryWrites=true&w=majority";
mongoose.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("database connected!");
});
   

//// create express web server
// basic route
app.get("/", (req, res) => {
    //res.send("app is ready!");
    //res.render("./home.handlebars");
    //// fetch data from database
      Profile.find({})
        .lean()
        .then((profile) => {
          res.render("./home", { profile });
        })
        .catch((err) => console.log(err));
});
// listen port
let port = 2700;

app.listen(port, (err) => {
    if (err) throw err;
    console.log("express server is running on port number" + port);
});


//// ALL GET REQUEST  (@HTTP METHODS ARE GET,POST,PUT,DELETE)  (BASIC ROUTING)
app.get("/login", (req, res) => {
    res.render("./auth/login");
});
app.get("/register", (req, res) => {
    res.render("./auth/register");
});
app.get("/add-profile", (req, res) => {
  res.render("./profiles/addprofile-form");
});


//// ALL POST REQUEST 
app.post("/create-profile", (req, res) => {
    //console.log(req.body);
    //res.send("now we got an information from server");
    const { firstname, lastname, phone } = req.body;
    let errors = [];
    if (!firstname) {
        errors.push({ text: "Firstname is Required!" });
    }
    if (!lastname) {
        errors.push({ text: "Lastname is Required!" });
    }
    if (!phone) {
        errors.push({ text: "phone is Required!" });
    }
    if (errors.length > 0) {
        res.render("./profiles/addprofile-form", {
            // this is a object but in es6 if key and value are same then no need to write key like (firstname:firstname) ,also as it is destructed above to req.body
            errors,
            firstname,
            lastname,
            phone,
        });
    } else {
        let newProfiles = {
            firstname,
            lastname,
            phone,
        };
        //// store into database
        new Profile(newProfiles)
            .save()
            .then((profile) => {
                res.redirect("/", 201, { profile });
            })
            .catch((err) => console.log(err));
    }
});
    //console.log(req.body);
    //     new Profile() = res.send(
    //     "successfully submitted will get back to you"
    // );




//// middleware types (request,response,next)
// application level middleware
// router level middleware
// error handling middleware
// built-in middleware
// third party middleware

//// application level middleware, create custom middleware app.use(), app.method(), (get,post,put,delete) 
// let middleware1 = (req, res, next) => {
//     console.log("i am middleware1");
//     next();
// };
// app.use(middleware1);
// let middleware2 = (req, res, next) => {
//     console.log("i am middleware2");
//     next();
// };
// app.use(middleware2);

//// error handling middleware has 4 arguements i.e including error
// app.use((error, req, res, next) => {
//     console.error(error.stack);
//     res.status(500).send("Something broke!");
// });

//// built-in middleware
// express built-in  (mandatory middleware)
// app.use(express.static);  // to serve static folder and files like  frontend, html, css, image
// app.use(express.json);  // payloads, json req.body  
// app.use(express.urlencoded({ extended: true }));
  // example for built in middlware
// app.use(express.static(__dirname + "/public"));  // connecting public folder
// const port = 4000;
// app.listen(port, (err) => {
//     if (err) throw err;
//     console.log("server is running on port number" + port);
// });

//// third party middleware
// it extends extra functionality in our application (passport, parser, timeout, cookie-parser)
//// server rendering 
// we use third party middleware 
// template engines  (pug, jade, express-handlebars, hoganjs, ejs, stylus, hbs)
