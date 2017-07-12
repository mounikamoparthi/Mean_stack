const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/message_board');
mongoose.Promise = global.Promise;

//define Schema variable
var Schema = mongoose.Schema;
// define Post Schema
var PostSchema = new mongoose.Schema({
 name: {type:String, required: true, minlength: 4},
 messagetext: {type: String, required: true }, 
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true });
// define Comment Schema
var CommentSchema = new mongoose.Schema({
  name: {type:String, required: true, minlength: 4},
 _post: {type: Schema.Types.ObjectId, ref: 'Post'},
 commenttext: {type: String, required: true }
}, {timestamps: true });
// set our models by passing them their respective Schemas
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
// store our models in variables
var Post = mongoose.model('Post'); // var name is used in Post,find
var Comment = mongoose.model('Comment');

// route for getting a particular post and comment
app.get('/', function(req,res) {
    Post.find({}).populate('comments').exec(function(err,x){
        console.log('postmsg get',x )
        res.render('index', {postmsg:x, errors:err});
 })
   
});


// route for creating one comment with the parent post id
app.post('/message', function (req, res){
    console.log("POST DATA", req.body);
  var postmsg = new Post({name: req.body.name, messagetext: req.body.message});
         postmsg.save(function(err){
                       if(err) { 
                           console.log('Error in posting'); 
                           errors = err;
                           res.render('index', {errors: postmsg.errors});
                        } 
                       else {
                           console.log("successfully added a post"); 
                           res.redirect('/');
                         }
                 });
         });

app.post('/comment', function (req, res){
    Post.findOne({_id: req.body.msgid}, function(err, x){
         console.log("POST DATA", req.body);
            var postcmt = new Comment({name: req.body.name, commenttext: req.body.comment});
            postcmt._post = x._id;
            //console.log("entered")
            x.comments.push(postcmt);
            postcmt.save(function(err){
                        if(err) { 
                            console.log('Error in postcmt'); 
                            errors = err;
                            } 
                        else {
                            errors =""
                            x.save(function(err){
                                if(err){
                                    console.log('errors',err);
                                }
                                else{
                                    console.log("successfully added comment"); 
                                    res.redirect('/');
                                }
                            })
                            
                            }
                    });
            });
});
  
app.listen(8000, function() {
    console.log("listening on port 8000");
});