//! İMPORTS
const path = require('path')
const express = require('express');
const passport = require('passport')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const flash = require('express-flash');
require('./src/controllers/users/loginController');
require('./src/config/database');
const User = require('./src/models/users/userModel')



//!APP USE
const app = express();
app.use(session({secret:'onersene'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    res.locals.username = req.user.username; // Kullanıcının adını res.locals üzerine ekleyin
  }
  next();
});



// //! flash
// app.use(flash());
// app.use(function (req, res, next) {

//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     res.locals.success = req.flash('success');
//     res.locals.success_update = req.flash('success_update');
//     res.locals.success_add = req.flash('success_add');
//     res.locals.success_msg_flash = req.session.success_msg_flash

//     next();
// });


//! template system
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.resolve(__dirname, './src/views'));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//! express system use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//! home router
app.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('home', { user: req.user });
  } else {
    res.render('home', { user: null });
  }
})






//! google
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // Kullanıcıyı veritabanına kaydetmeye çalışın
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          // Kullanıcı zaten varsa, profilini güncelleyebilirsiniz
          // Örneğin, refreshToken veya diğer bilgileri güncelleyebilirsiniz.
          existingUser.refreshToken = refreshToken;

          // Kullanıcı adını kaydetmek için
          existingUser.username = profile.displayName;

          await existingUser.save();

          // Kullanıcıyı oturum açtıktan sonra giriş yaptıktan sonra yönlendirin
          return done(null, existingUser);
        } else {
          // Yeni kullanıcıyı oluşturun ve kaydedin
          const newUser = new User({
            googleId: profile.id,
            username: profile.displayName, // Kullanıcı adını kaydetmek
          });

          await newUser.save();

          // Kullanıcıyı oturum açtıktan sonra giriş yaptıktan sonra yönlendirin
          return done(null, newUser);
        }
      } catch (error) {
        return done(error, false); // Hata durumunda
      }
    }
  )
);


// Passport için kullanıcı serileştirme işlemini yapın.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    if (id) {
      const user = await User.findById(id);
      if (user) {
        done(null, user); // Kullanıcı bulunduysa
      } else {
        done(new Error('Kullanıcı bulunamadı'), null);
      }
    } else {
      done(null, null); // Kullanıcı giriş yapmadıysa
    }
  } catch (error) {
    done(error, null);
  }
});









//! google link
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  })
);
















//! router road
const adminRouter = require('./src/router/adminRouter');
const userRouter = require('./src/router/userRouter')

//! router import
app.use('/admin', adminRouter);
app.use('/user', userRouter);





//! PORTS 3000
app.listen(process.env.PORT, () => {
    console.log(`Server run this port -> ${process.env.PORT}`);
})



