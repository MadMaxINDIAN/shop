const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_USER_AUTHKEY } = require("./../config");
const validateRegisterInput = require("../validation/registerInput");
const validateLoginInput = require("../validation/loginInput");
const passport = require("passport");
require("../auth/user_passport")(passport);
const User = require("./../models/USER");

const AppLogURL = (url, status, time, method) => {
  console.log(`${url} [${status}] ${time}ms [${method}]`);
  return;
};

// @url     POST /u/register
// @desc    Create or update user
// @access  Public
router.post("/register", (req, res) => {
  const start = new Date();
  // Input validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    AppLogURL("/u/register", 400, new Date() - start, "POST");
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.email = "Email already exist";
        AppLogURL("/u/register", 400, new Date() - start, "POST");
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                const payload = {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                };
                jwt.sign(
                  payload,
                  JWT_USER_AUTHKEY,
                  { expiresIn: 10000 },
                  (err, token) => {
                    AppLogURL("/u/register", 200, new Date() - start, "POST");
                    res.json({
                      ...payload,
                      auth_token: "Bearer " + token,
                    });
                  }
                );
              })
              .catch((err) => console.log(err));
          })
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// @url     POST /u/login
// @desc    Login User
// @access  Public
router.post("/login", (req, res) => {
  const start = new Date();
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    AppLogURL('/u/login',400,new Date() - start,'POST')
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email: email }).then((user) => {
    console.log('User login');
    if (!user) {
      errors.email = "User not Found";
      AppLogURL('/u/login',404,new Date() - start,'POST')
      return res.status(404).json(errors);
    } else {
      // Check Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User Match

          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };

          // Sign Token
          jwt.sign(
            payload,
            JWT_USER_AUTHKEY,
            { expiresIn: 10000 },
            (err, token) => {
              AppLogURL('/u/login',200,new Date() - start,'POST')
              res.json({
                ...payload,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          AppLogURL('/u/login',400,new Date() - start,'POST')
          return res.status(400).json(errors);
        }
      });
    }
  });
});

// @route   GET /u/
// @desc    Return Current User
// @access  Private
router.get("/",passport.authenticate('user-jwt',{session:false}),(req,res) => {
  res.json({
      id : req.user.id,
      name : req.user.name,
      email : req.user.email
  })
})

module.exports = router;
