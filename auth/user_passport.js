// User Authorisation
const JwtStratergy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { JWT_USER_AUTHKEY } = require("./../config");
const User = require("../models/USER");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_USER_AUTHKEY;

module.exports = passport => {
    passport.use(
        "user-jwt",
        new JwtStratergy(opts, (jwt_payload,done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user){
                        return done(null,user);
                    }
                    return  done(null,false);
                })
                .catch(err => console.log(err)
                );
        })
    )
}