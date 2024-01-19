const express = require("express");

const env = require("dotenv").config({ path: "./config.env" });
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//used for hasing passwords
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 

// Adds a movie to the users list
recordRoutes.route("/userlist/add").post(async function (req, res) {
  // Connect to MongoDB
  let db_connect = dbo.getDb("movieknightdb");
    
  try 
  {
   
    const movie = await db_connect.collection('masterlist').findOne({ title: req.body.title});

    var userQuery = { _id: req.body._id};

    console.log(movie.title);

    db_connect.collection('users').updateOne(userQuery,{ $push: { userlist: movie}}, function (err, res){ });
    res.json({message:"Added to list."});
  } 

  // Some kind of Server Error
  catch (error) 
  {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN API Route
recordRoutes.route("/login").post(async function (req, res) 
{
  // Connect to MongoDB
  let db_connect = dbo.getDb();

  try 
  {
    // Check for User/Pass in database
    const user = await db_connect.collection('users').findOne({username: req.body.username});

    // Case: Valid Login
    if (user) 
    { 
      // Send the user a valid JWT token with the userID
      const passCheck = await bcrypt.compare(req.body.password, user.password);

      if (passCheck == true)
      {
        const token = jwt.sign({_id:user._id.toString(),firstname:user.firstname,lastname:user.lastname},process.env.JWTPRIVATEKEY,{expiresIn: "1h"});
      
        return res.status(200).send({data:token, message:"Login Success"});
      }
      else { return res.status(409).send({message:"Login Failed"}); }
    }

    // Case: Invalid Login
    else { return res.status(409).send({message:"Login Failed"}); }

  } 
  catch (error) { res.status(500).send({message:"Internal Server Error"}); }

});

// SIGNUP API Route
recordRoutes.route("/signup").post(async function (req, res) 
{
  // Connect to MongoDB
  let db_connect = dbo.getDb();

  let blankArray = [];
 
 // Input from the User
 let myobj =
  {
   username: req.body.username,
   password: req.body.password,   
   firstname: req.body.firstname,
   lastname: req.body.lastname,
   email: req.body.email,
   movielist: blankArray
  };

  try 
  {
    // Check if username is already taken
    const user = await db_connect.collection('users').findOne({username: req.body.username});

    // Return 409 if username is taken
    if (user) { return res.status(409).send({message:"Username is Already Taken"}); }

    // Hash and update the password --> *** SALT == 10 ***
    const hashPassword = await bcrypt.hash(req.body.password,10);
    myobj.password = hashPassword;

    // Insert the new user data into the database
    const user1 = await db_connect.collection("users").insertOne(myobj);
    id = user1.insertedId;

    // Send the user a valid JWT token with the userID
    const token = jwt.sign({_id:id,firstname:req.body.firstname,lastname:req.body.lastname},process.env.JWTPRIVATEKEY,{expiresIn: "1h"});

    // Return 200 if everything works out
    res.status(200).send({data:token, message:"User Created successfully"});
  } 
  catch (error) { res.status(500).send({message:"Internal Server Error"}); }

});

// VERIFY JWT API Route
recordRoutes.route("/auth").post(async function (req, res)
{
  const token = req.body.token;
  //console.log(token);

  // check json web token exists & is verified
  if (token) 
  {
    // Verify JWT token
    jwt.verify(token,process.env.JWTPRIVATEKEY, (err, decodedToken, next) => 
    {
      // Case: JWT Token is Invalid
      if (err) 
      {
        //console.log(err.message);
        return res.status(410).send({message:"Bad JWT"}); 
      } 

      // Case: JWT is Valid
      else
      {
        //console.log(decodedToken);
        return res.status(200).send({message:"Good JWT", data:decodedToken});
      }
    });
  } 

  // Error: Redirect User Back to Home
  else { return res.status(409).send({message:"No JWT"}); }
});

// GET ALL MOVIES API Route
recordRoutes.route("/getAll").post(async function (req, res)
{
  // Connect to MongoDB
  let db_connect = dbo.getDb();
  
  data = await db_connect.collection('masterlist').find().toArray();
  //console.log(data);

  // check json web token exists & is verified
  if (data) { return res.status(200).send({message:"Data Retirved", data:data}); } 

  // Error: Redirect User Back to Home
  else { return res.status(500).send({message:"Internal Server Error, Try Again Later."}); }
});

// GET USER MOVIES API Route
recordRoutes.route("/getUserMovies").post(async function (req,res)
{
  req.body.userID = new ObjectId(req.body.userID);
  //console.log(req.body.userID);
  // Connect to MongoDB
  let db_connect = dbo.getDb();

  const data = await db_connect.collection('users').findOne({_id: req.body.userID});

  //console.log(data);

  // check json web token exists & is verified
  if (data) { return res.status(200).send({message:"Data Retirved", data:data.movielist}); } 

  // Error: Redirect User Back to Home
  else { return res.status(500).send({message:"Internal Server Error, Try Again Later."}); }
});

// ADD REVIEW API Route
recordRoutes.route("/addReview").post(async function (req, res)
{
  req.body.movieID = new ObjectId(req.body.movieID);
  req.body.userID = new ObjectId(req.body.userID);

  // Verify that Rating is between 0 and 10 (inclusive)
  const rating = parseInt(req.body.rating);
  if(!(rating >= 0 && rating <= 10)) { return res.status(408).send({message:"Ratings must be between 0-10"}); }

  // Connect to MongoDB
  let db_connect = dbo.getDb();

  // DO NOT uncomment this unless you know what you're doing
  //const data = await db_connect.collection('masterlist').updateMany({}, { $set: {avgScore : 0} });
  //const data = await db_connect.collection('masterlist').updateMany({}, { $set: {numReviews : 0} });
  //const data = await db_connect.collection('masterlist').updateMany({}, { $set: {netScore : 0} });

  // Check if a Review already exists
  const dupCheck = await db_connect.collection('users').findOne({_id: req.body.userID});
  const movielist = dupCheck.movielist;
  var hasReview = false;
  //console.log(req.body.movieID);
  for (i = 0; i < movielist.length; i++) 
  {
    //console.log(movielist[i]._id);
    if (movielist[i]._id.toString() === req.body.movieID.toString()) { hasReview = true; }
  }
  //console.log(hasReview);

  //console.log(movielist);
  
  // const dupCheck = await db_connect.collection('users').findOne({ movielist: { $elemMatch: { _id: req.body.movieID } } });

  // Case: Review Already Exists --> Return 409 Conflict
  if(hasReview) 
  {
    //console.log("HERE");
    // console.log(dupCheck);
    // console.log(dupCheck.findOne({_id:req.body.movieID}));
    return res.status(409).send({message:"Review Already Exists for this Movie"}); 
  }

  // Otherwise, add the review to the movie

  const data = await db_connect.collection('masterlist').findOne({_id:req.body.movieID});
  // console.log("data:" + data);

  // Grab Current Movie Values
  var numRev = parseInt(data.numReviews) + 1;
  var totalScore = parseInt(data.netScore) + parseInt(req.body.rating);

  // Update the Ratings of the movie
  var update = await db_connect.collection('masterlist').updateOne({_id:req.body.movieID},{$set:{numReviews:numRev}});
  update = await db_connect.collection('masterlist').updateOne({_id:req.body.movieID},{$set:{netScore:totalScore}});
  update = await db_connect.collection('masterlist').updateOne({_id:req.body.movieID},{$set:{avgScore:(parseFloat(totalScore) / parseFloat(numRev))}});

  //console.log(data);
  // console.log(req.body.userID);
  data.rating = parseInt(req.body.rating);
  const user = db_connect.collection('users').updateOne({_id:req.body.userID},{ $push: { movielist: data}}, function (err, res){ });

  // check json web token exists & is verified
  if (data) { return res.status(200).send({message:"Review Added", data:data}); } 

  // Error: Redirect User Back to Home
  else { return res.status(500).send({message:"Internal Server Error, Try Again Later."}); }
});


module.exports = recordRoutes;