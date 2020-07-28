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


//// installation steps for middleware :----
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");


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
    res.render("./home.handlebars");
});
// listen port
let port = 2700;

app.listen(port, (err) => {
    if (err) throw err;
    console.log("express server is running on port number" + port);
});



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
  //// example for built in middlware
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
