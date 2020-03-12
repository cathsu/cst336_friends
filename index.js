/*
    To use EJS 
    1. Every ejs file has an extension .ejs
    2. NodeJS looks into a folder "views" to render a page
    3. Tell NodeJS to use ejs as page rendering engine
    
*/


var express = require("express"); 
var bodyParser = require("body-parser");
var app = express(); 

app.use(express.static("css")); // check for css folder
app.use(bodyParser.urlencoded({extended: true})); // data as a json object 
app.set('view engine', 'ejs'); 

// Create routes
app.get("/", function(req, res) {
    // res.send("HELLO WORLD");
    res.render("home"); // since we've set the engine to be ejs, the .ejs extension is not necessary
}); 

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friendList}); // send friendList as object - key, value pair 
}); 

var friendList = ["Alice", "Clark", "Bellamy", "Octavia"];
app.get("*", function(req, res) {
    // res.send("Page Not Found");
    res.render("error");
}); 

app.post("/addfriend", function(req, res) { //submit data (on client side) back to server
    var newFriend = req.body.newfriend; 
    friendList.push(newFriend);
    res.redirect("/friends"); //redirect to route friends
})


// Create a listener to deploy the app
app.listen(process.env.PORT, function() {
    console.log("Server is running..."); 
}); 

