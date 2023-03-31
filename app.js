// *** Constant Require Section: ***
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
 
// *** Constant Variables Section: ***
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
 
const app = express();
// *** Setup ejs ***
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
 
// *** Body Parser ***
app.use(bodyParser.urlencoded({extended: true}));
 
// *** Static Folder ***
app.use(express.static("public"));
 
// *** MongoDB or Mongoose Connecting url ***
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});
 
// *** Create a Schema: ***
const postSchema = {
  title: String,
  content: String
};
 
// *** Create a Mongoose Model: (usually Capitalized) ***
const Post = mongoose.model("Post", postSchema);
 
// *** Empty Array receiving Pushed posts ***
// let posts = [];
 
// *** Tracking and Rendering "Home" Web Pages: ***
app.get("/", function(req,res){
  // *** Mongoose find() ***
  Post.find({}, function(err, posts){
    res.render("home", {startingContent: homeStartingContent, posts: posts});
  });
});
 
// *** Tracking and Rendering "Compose" Web Pages (hidden): ***
app.get("/compose", function(req,res){
  res.render("compose");
});
 
// *** Parsing, Submitting and Redirecting pushed "Posts" form /compose page to /Home Page: ***
app.post("/compose", function(req, res){
// *** Create a Mongoose Documents: ***
  const post = new Post ({
        // parsing and getting:   "inputTitle" from ("/compose") line: 8
        title: req.body.inputTitle,
        // parsing and getting:   "inputPost" from ("/compose") line: 10
        content: req.body.inputPost  
  });
  
  // posts.push(post);
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  }); 
});
 
// *** Setting up a paths for Posts pages with "lodash": ***
app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;
  // *** Set the findOne() method to find a post with his ID ***
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post",{
      title: post.title,
      content: post.content
    });
  });
});
 
 
// *** Tracking and Rendering "About" Web Pages: ***
app.get("/about", function(req,res){
  res.render("about", {aboutText: aboutContent});
});
 
// *** Tracking and Rendering "Contact" Web Pages: ***
app.get("/contact", function(req,res){
  res.render("contact", {contactText: contactContent});
});
 
// *** Our Server PORT Starter on Heruko or localy (process.env.PORT || 3000, function()) : ***
app.listen(3000, function() {
  console.log("Server started on port 3000");
});