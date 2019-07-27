const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");

// Passport Authentication using the "Local" strategy (Username/Password)
function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    User.findOne({ username: username }, async (error, user) => {
      if (error) {
        return done(error);
      }

      await bcrypt
        .compare(password, user.password)
        .then(isValidPassword =>
          isValidPassword
            ? done(null, user)
            : done(null, false, {
                message: "Invalid Password."
              })
        )
        .catch(error => done(error, false, { message: "Error Logging In." }));
    });
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username"
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (error, user) => 
      error ? done(error) : done(null, user)
    );
  });
}

module.exports = initialize;
