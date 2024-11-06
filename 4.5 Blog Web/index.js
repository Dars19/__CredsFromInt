import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
var isLogin = false;
var isReloaded = false;
var userPost = [];
var data;
var postIndex;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // This is for ejs to access static files like css.


app.get("/",(req, res) =>{
    if (isLogin === true) {
        res.render("Post_Page.ejs",data);
    } else {
        res.render("Login_Page.ejs");
    }    
});

app.post("/action_Login",(req, res) =>{
// post once user has TRY TO login.
    data = req.body;

    if (data.username === "administrator"){ //&& data.password === "LocalPassword"
        res.render("Post_Page.ejs", data);
        isLogin = true;
    }else{
        res.render("errorLogin.ejs");
    }
});

app.get("/action_Login",(req, res) =>{
        if (isLogin === true) {
            res.render("Post_Page.ejs",data);
        } else {
            res.render("Login_Page.ejs");
        }
    });

app.get("/Post",(req, res) =>{
    if (isLogin === true) {
        res.render("Post_Page.ejs",data);
    } else {
        res.render("Login_Page.ejs");        
    }    
});

app.post("/Post",(req, res) =>{
    if (isLogin === true) {
        var theBlog = req.body;
        userPost.push(theBlog.blogPost);
        res.render("Post_Page.ejs",data);
    } else {
        res.render("Login_Page.ejs");        
    }    
});

app.get("/Logged_Out",(req, res) =>{
    isLogin = false;
    res.render("Login_Page.ejs");
});

app.get("/Home", (req, res) =>{
    if (isLogin === true) {
        res.render("Home_Page.ejs", {user_Post: userPost });
    } else {
        res.render("Login_Page.ejs");
    }
});

app.post("/Home", (req, res)=>{
    if (isLogin === true) {
        var editedPost = req.body;
        delete userPost[postIndex.postID];
        userPost[postIndex.postID] = editedPost.edited;
        res.render("Home_Page.ejs", {user_Post: userPost, postIndex });
    } else {
        res.render("Login_Page.ejs");
    }
});

app.post("/Post-Delete",(req, res) => {
    if (isLogin === true) {
        var postIndex = req.body;
        var x = userPost.splice(postIndex.postID,1);


        //To load the home page.
        res.render("Home_Page.ejs",{user_Post: userPost });
    } else {
        res.render("Login_Page.ejs");
    }
});

app.post("/Post-Edit", (req, res) =>{
    if (isLogin === true) {
        postIndex = req.body;


        res.render("Edit_Page.ejs",{user_Post: userPost, postIndex});
    } else {
        res.render("Login_Page.ejs");
    }
});



app.use((req, res) => {
    if (isLogin === true) {
        res.status(404);
        res.send('<h1>Error 404: Resource not found</h1>')
    } else {
        res.render("Login_Page.ejs");
    }

  })

app.listen(port,()=>{
    console.log(`Listening on port ${port} `);
});

