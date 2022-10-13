// console.log("hey backend expert")
require("dotenv").config();
require("./config/database").connect();
// importing user context
const User = require("./model/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/read');
  });

app.post("/create", async (req, res) => {
  // Our signup logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email:email.toLowerCase() });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our signup logic ends here
});

app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.password=null;
      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
      
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
});

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// Read all the existent users in database

app.get("/read", (req, res) =>
  User.find({}, (err, users) => {
    if (err) {
      res.send("Error when fetching users.");
      next();
    }
    res.send(
      users.reduce((userMap, item) => {
        userMap[item.id] = item;
        return userMap;
      }, {})
    );
  })
);

app.put("/update",auth,async (req,res)=>{
    const token_user = req.user;
    if(!token_user){
        res.status(401).send("Unauthenticated");
        return;
    }

    const {updatedPassword, oldPassword} = req.body;
    const  user = await User.findOne({email:token_user.email});

    if(!user){
        res.status(404).send("user not found!");
        return;
    }
    //console.log(user);

    if(await bcrypt.compare(oldPassword,user.password)){
        let newPasswordHash = await bcrypt.hash(updatedPassword,10);
        user.password=newPasswordHash;
        user.save();
        res.status(200).send("Updated!");
        return;
    }

    
    res.status(403).send("Wrong password!");


});

app.delete("/delete/:id", (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((doc) => {
      if (!doc) {
        return res.json({
          message: "No such User!",
        });
      }
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});


 
module.exports = app;
