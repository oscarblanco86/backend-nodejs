const passport = require('passport');

const LocalStrategy = require('./strategies/local.stratey');

passport.use(LocalStrategy)